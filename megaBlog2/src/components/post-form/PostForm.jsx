// import React, {useCallback} from 'react';
// import {useForm} from "react-hook-form";
// import { Button, Input, Select, RTE } from "../index";
// import appwriteService from "../../appwrite/config";
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// function PostForm({post}) {

//     const navigate = useNavigate();
//     const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
//         defaultValues: {
//             title: post?.title || '',
//             slug: post?.slug || '',
//             content: post?.slug || '', 
//             status: post?.status || 'active',
//         }
//     });

//     const userData = useSelector(state => state.auth.userData);

//     /*
//     const submit = async (data) => {
//         if (post) {
//             // so, files we are uploading in bucket and each file will have a unique id in bucket.
//             // this data.image[0] is from react-hook-form after submitting
            
//             const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

//             if (file) {
//                 appwriteService.deleteFile(post.featuredImage);
//                 // so the post passed by the user and we will delete old image of that post and update it with new one.
//             }
//             // The code you provided ensures that the uploadFile method will only be called if data.image[0] exists. If data.image[0] is truthy (i.e., it contains an image), the uploadFile method will be called, initiating the process of uploading the file to Appwrite's Storage service. If data.image[0] is falsy (i.e., it does not contain an image), null will be returned, and no unnecessary API request will be made. This approach helps optimize the use of resources and API calls in your application.
//             const dbPost = await appwriteService.updatePost(post.$id, {
//                 ...data,
//                 // overriding featuredImage
//                 featuredImage: file ? file.$id : undefined
//                 // here, in return createFile will send object that will contain id of that file.
//             });

//             if (dbPost) {
//                 navigate(`/post/${dbPost.$id}`)
//             }

//         } else {
//             const file = (data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null);

//             if (file) {
//                 const fileId = file.$id;
//                 data.featuredImage = fileId;
//                 const dbPost = await appwriteService.createPost({...data, userId: userData.$id });

//                 if (dbPost) {
//                     navigate(`/post/${dbPost.$id}`);
//                 }
//             }
//         }
//     }
//     */

//     const submit = async (data) => {
//         if (post) {
//             const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

//             if (file) {
//                 console.log(post.featuredImage);
//                 await appwriteService.deleteFile(post.featuredImage);
//             }

//             const dbPost = await appwriteService.updatePost(post.$id, {
//                 ...data,
//                 featuredImage: file ? file.$id : undefined,
//             });

//             if (dbPost) {
//                 navigate(`/post/${dbPost.$id}`);
//             }
//         } else {
//             console.log(userData);
//             const file = await appwriteService.uploadFile(data.image[0]);

//             if (file) {
//                 const fileId = file.$id;
//                 data.featuredImage = fileId;
//                 const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

//                 if (dbPost) {
//                     navigate(`/post/${dbPost.$id}`);
//                 }
//             }
//         }
//     };

//     // here, slug is getting transform spaces will be replaced by '-' and based on the title we are updating slug value.
    
//     const slugTransform = useCallback((value) => {
//         if (value && typeof value === 'string') {
//             return value
//                 .trim()
//                 .toLowerCase()
//                 .replace(/[^a-zA-Z\d\s]+/g, "-")
//                 .replace(/\s/g, "-");
//         }

//         return '';
//     }, []);

//     // When the title field changes, the slugTransform function is called to transform the title value into a slug format, and the resulting slug value is set as the value of the slug field using the setValue function.

//     // So, whenever the user types in the title field, the useEffect hook will trigger, and the slug field will automatically update based on the transformed value of the title field. This ensures that the title and slug fields stay in sync without the need for manual intervention.

//     // If the user manually types into the slug field, the title field will not be updated based on the slug. This allows users to customize the slug independently.

//     // If the user doesn't manually set the slug, it will be automatically generated based on the title field. This ensures that if the user doesn't specifically set the slug, it will still have a value based on the title, maintaining consistency and providing a default behavior.

//     React.useEffect(() => {
//         const subscription = watch((value, { name }) => {
//             // name is the field that has changed and based on that watch is called and in value we have old form data
//             if (name === "title") {
//                 setValue("slug", slugTransform(value.title), { shouldValidate: true });
//             }
//         });

//         return () => subscription.unsubscribe();
//     }, [watch, slugTransform, setValue]);

//   return (
//     <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
//         <div className="w-2/3 px-2">
//             <Input
//                 label="Title :"
//                 placeholder="Title"
//                 className="mb-4"
//                 {...register("title", { required: true })}
//             />
//             <Input
//                 label="Slug :"
//                 placeholder="Slug"
//                 className="mb-4"
//                 {...register("slug", { required: true })}
//                 onInput={(e) => {
//                     // setValue programmatically changes value of a particular field.
//                     setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
//                 }}
//             />
//             {
//                 /* This RTE is a editor from tinyMCE that is integrated into react-hook-form by using controller */
//             }
//             <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")}
//             apiKey='j4rq5d6kvq4h6oop3mg8nny9rbv0jx4y5oglhepn5dakfmkj'
//             />
//         </div>
//         <div className="w-1/3 px-2">
//             { /* This image will be stored in bucket */}
//             <Input
//                 label="Featured Image :"
//                 type="file"
//                 className="mb-4"
//                 accept="image/png, image/jpg, image/jpeg, image/gif"
//                 {...register("image", { required: !post })}
//             />
//             {post && (
//                 <div className="w-full mb-4">
//                     <img
//                         src={appwriteService.getFilePreview(post.featuredImage)}
//                         alt={post.title}
//                         className="rounded-lg"
//                     />
//                 </div>
//             )}
//             <Select
//                 options={["active", "inactive"]}
//                 label="Status"
//                 className="mb-4"
//                 {...register("status", { required: true })}
//             />
//             <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
//                 {post ? "Update" : "Submit"}
//             </Button>
//         </div>
//     </form>
//   )
// }

// export default PostForm;

import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        console.log(typeof data.image, data.image[0]);
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                console.log(post.featuredImage, post);
                await appwriteService.deleteFile(post.featuredImage);
            }
            
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
            
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                // here, we are adding featuredImage property to data came from form data.
                data.featuredImage = fileId;
                console.log(userData);
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4 text-gray-3
                    00"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                    disabled
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}



















