/*

import conf from '../conf/conf';
import { Client, ID, Account } from 'appwrite';

export class AuthService {

    client = new Client();              // we are not setting endpoint and project id here bcoz we do not want that client to be created by default when code inside class will run. Instead we want that this client to be initialized when object (authService) is created.

    account;        // here, we are not initializing Account instance bcoz we have not set endpoint and project id to client.

    // when authService will be initialized with new then constructor will be called and hence, we will initialize our client and account in constructor.

    constructor () {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount ({email, password, name}) {
        try {
           const userAccount = await this.account.create(ID.unique(), email, password, name);
            
           if (userAccount) {
            return this.login(email, password);
            // If registered successfully then directly login user and session object will be returned.
           } else {
            return userAccount;
           }

        } catch (error) {
            throw error;
        }
    }

    async login ({email, password}) {
        try {
            return await this.account.createEmailSession(email, password); 
            // session object returned
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser () {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout () {
        try {
            return await this.account.deleteSessions();
            // to delete all sessions we can delete individual as well
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }

}

const authService = new AuthService();

export default authService;

*/

import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        console.log(email, password);
        try {
            return this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService

