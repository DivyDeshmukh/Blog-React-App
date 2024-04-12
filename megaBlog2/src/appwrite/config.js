import conf from '../conf/conf';
import { Client, ID, Databases, Storage, Query } from 'appwrite';

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor () {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // we have a database blog inside that we have a collection articles inside that we are creating this createPost documents and these arguments are the attributes that we have defined earlier in appwrite that basically represents the blueprint for documents that will be added inside it. 

    //  passing the user ID when creating a document helps establish ownership, enforce authorization, personalize experiences, and enable analytics, all of which contribute to a more robust and user-centric application.

    async createPost ({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId, conf.appwriteCollectionId, 
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    async updatePost (slug, {title, content, featuredImage, status, userId}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );

        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    // useParams se lenge jo ki document ke id se Route banega to whaha se post lenge or fir us post ya doc se uski id 
    async deletePost (slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost (slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );

        } catch (error) {
              console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }
 
    // getting selected posts based on the query
    async getPosts (queries = [Query.equal("status", "active")]) {
        // this status is given inside collection inside indexes
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service :: getAllPosts :: error", error);
            return false;
        }
    }

    // file upload services

    
    async uploadFile (file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    /* 
    A preview is a smaller, simplified version or representation of a larger item, typically used to give users a quick glimpse or overview of the content without requiring them to open the full item. In the context of files, a preview often refers to a simplified or condensed version of the file's content that can be displayed or accessed quickly.
    */
   
    getFilePreview (fileId) {
        return this.bucket.getFilePreview (
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service();

export default service;

