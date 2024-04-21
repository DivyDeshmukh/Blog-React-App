# our role in front-end is mainly of making api requests and when the server sends that data back to us so handle that data in UI.  front-end developers play a vital role in integrating APIs into web applications, fetching data from servers, and presenting it to users in an intuitive and interactive manner. Their responsibilities extend beyond just UI design to encompass data management, state handling, and ensuring a smooth user experience through effective API communication.

# When working with React for front-end development and handling API requests efficiently, there are several technologies and libraries you can integrate to streamline your workflow:-
1. Axios or Fetch API
2. React Router 
3. Redux
4. Redux Thunk or Saga
5. Axios Interceptors
6. React Query
7. Formik or React-Hook_form
8. Testing Library (like Jest, etc.)

# In this project, we will use appwrite that is Backend as a Service (BaaS).

# This is good when we have to create a full-fledged app and do not want to write custom backend.

# dependencies used in these projects:
1. React-hook-form
2. tinyMCE Editor
3. html-react-parser
4. appwrite (for backend)
5. Redux
6. React-Router DOM
7. Redux Toolkit
8. TailwindCSS

# Learning-1
-- ENV variables and create a .env file and assign all values in it that we got after building project from appwrite. read from mobile notes about env.

# We must BaaS in a way that we do not get trapped in a vendor lock-in situation. If we want then we can easily switch to any other Backend as a service (like firebase) or our custom backend.

# Appwrite:-

# Basically, we have to initialize a client that will establish a connection between our project and appwrite server. We have to mention a endpoint where the api requests will go and also the project Id that will appwrite server to identify our project. The client acts as the interface through which you interact with the Appwrite services.

# Now, appwrite provides different services that we can use like account, database, storage, etc. To use them we have to create a instance of those services and then we can call different methods on that instances.

# These methods will make http requests or api requests to the mentioned appwrite server and trigger required tasks that needs to be performed to implement a particular action. After performing the requested action on the Appwrite server, it sends back the required data or response to your application. 

# In JavaScript classes, when you declare properties without using this, those properties belong to the class itself, not to instances of the class. These properties are known as static properties. Static properties are shared among all instances of the class, and they can be accessed using the class name itself.

# However, if you want properties to belong to instances of the class (meaning each instance gets its own copy of the property), you must use this to define those properties. This ensures that each instance has its own separate set of properties, distinct from other instances.

# Similarly, when you want to modify or access instance-specific properties within the constructor or methods of the class, you must use this. This ensures that you're working with the properties of the current instance, rather than the class itself.

# Using Account Service for performing various authentication tasks:-
1. Registration:- create();         // The create method in the Account service of Appwrite returns information about the created account. This information typically includes the user ID, email, name, and any other details associated with the account. The response format is usually in JSON, containing key-value pairs representing the account information. It is better to wrap it inside a custom method so that later we want to shift to anyother BaaS or custom backend then we simply have to change methods inside that particular method in backend only and no changes need to be done in frontend. Also, as these methods will make api requests so perform error handling also. 

2. Login:- createEmailSession()         
The createEmailSession method in the account service of Appwrite returns a session object, typically in JSON format. This session object contains information such as the user's session ID, authentication token, expiration time, and possibly other metadata related to the email session or user. If data is invalid then login is not successful and returns an error. It's commonly used for user authentication and authorization purposes. To determine if a user is logged in or not after calling this method, you can check if the session object contains relevant information such as a session ID or an authentication token.

# A session in web development typically refers to a period of interaction between a user and a web application. It starts when a user logs in or starts interacting with the application and ends when the user logs out or the session expires due to inactivity.Sessions are often used to maintain stateful information about a user's interaction with the application. This can include things like authentication status, user preferences, shopping cart contents, etc.

3. Get Current User:- get();
The get method in the Account service of Appwrite returns information about the currently logged-in user. This information typically includes details such as the user's ID, email, name, and other profile-related data. The data is returned in JSON format.

4. logout:- deleteSessions()
To delete all sessions. 
The deleteSessions method in the account service of Appwrite returns a response indicating success or failure of the operation. It typically returns a JSON object containing information about the status of the operation, such as whether the sessions were successfully deleted or if there was an error. The format of the response could be something like this:
{
  "status": "error",
  "message": "Failed to delete sessions: Unauthorized"
}
or
{
  "status": "success",
  "message": "Sessions deleted successfully"
}

# what is slug? In the context of Appwrite, slugs are commonly used in projects involving content management systems (CMS), blogs, or any application where user-friendly URLs are desired. For example, if you have a blog post titled "Hello World!", its slug might be "hello-world".

# Basically, in appwrite we have created a database for our project with name 'blog' and that blog DB has one collection inside it which is 'articles' and then we have to create documents (here, posts) inside that collection and also we have to mention the attributes for that document (done in createPost method of config.js)

5. Create Documents inside collection:- .createDocument();         
// The createDocument method returns a JSON object representing the newly created document, containing the data that was inserted into the database. This JSON object typically includes properties such as the document ID, creation timestamp, and the data fields that were provided during the document creation process. Passing the user ID while creating a document can serve several important purposes:
Ownership: Associating the document with a specific user by including their ID indicates that the user is the creator or owner of the document. This ownership information can be useful for access control, permissions management, and auditing purposes. Authorization: By including the user ID, you can enforce authorization rules based on the user's identity. For example, you might restrict access to certain documents so that only the user who created them can view, edit, or delete them.
Personalization: Knowing the user who created a document allows you to personalize the user's experience within your application. You can tailor the content, recommendations, or interactions based on the user's own contributions or preferences.
Tracking and Analytics: Having the user ID associated with documents can facilitate tracking and analytics efforts. You can gather insights into user behavior, engagement patterns, content creation trends, and more by analyzing documents created by different users.

6. Update Documents:- .updateDocument()
when you call the updateDocument method to update a document in the database, it returns the updated document data as a JSON object. This JSON object contains the updated values of the fields in the document after the update operation has been completed.

7. Delete Documents:- deleteDocument()
The deleteDocument method in the database service of Appwrite returns information about the deletion operation in JSON format. This information typically includes metadata about the deleted document, such as its ID, collection name, and deletion timestamp.

8. Get Documents:- getDocument()
The getDocument method in the Appwrite Database service returns a document from a collection in the database. The returned JSON object contains the fields and values of the document retrieved from the collection. Each field represents a property of the document, and its corresponding value contains the data stored in that field.

9. Returns a list of documents:- listDocuments()
Get a list of all the user's documents in a given collection. You can use the query params to filter your results.
when you use the listDocuments method in Appwrite, it returns an object that contains a property named documents. This documents property holds an array of objects, where each object represents a document retrieved from the specified collection. Each document object typically contains various attributes and values associated with that document.
The listDocuments method in the database service of Appwrite returns a list of documents from a specific collection in the database. It returns this data in the form of a response object, typically in JSON format. 
The response object contains the list of documents retrieved from the specified collection.
Each document in the list represents a record stored in the collection.
The response object may contain metadata providing information about pagination, total number of documents, etc. The data returned by the listDocuments method is typically in JSON (JavaScript Object Notation) format.
JSON is a lightweight data interchange format that is easy for humans to read and write, and easy for machines to parse and generate.  eg:- {
  "documents": [
    {
      "id": "1",
      "name": "Document 1",
      "content": "Lorem ipsum dolor sit amet..."
    },
    {
      "id": "2",
      "name": "Document 2",
      "content": "Pellentesque habitant morbi..."
    },
    ...
  ],
  "total": 10,
  "page": 1,
  "perPage": 20
}

10. Query:- In the Appwrite database service, query methods typically return data retrieved from the database based on the specified query parameters. The format of the returned data depends on the specific query method and the structure of your database.
[Query.equal("status", "active")]

// this status is given inside collection inside indexes

11. UploadFile:- createFile()
In Appwrite, createFile is a method used to upload a new file to your Appwrite server. You call this method with the file data you want to upload, such as the file itself or its content in binary format, along with optional parameters like the file name, MIME type, and any custom metadata you want to associate with the file. Once the file is uploaded, it is stored in your Appwrite storage and becomes accessible for further use within your application. 
When you upload a file using the createFile method in Appwrite, you will receive an object containing information about the uploaded file. This object typically includes metadata about the file, such as its ID, name, size, MIME type, and other relevant details. The object may also contain a URL or path to access the uploaded file. This URL can be used to download or view the file from a browser or application. Appwrite's Storage service, each file (image or otherwise) stored within a bucket will have a unique ID associated with it. When you upload a file using the createFile method, the response object you receive will contain metadata about the uploaded file, including its unique ID within the bucket.

The ID returned in the response from createFile represents the unique identifier of the uploaded file within the specified bucket. You can use this ID to reference and access the file within the bucket for various operations, such as downloading, updating metadata, or deleting the file.

12. Delete File:- deleteFile();
In Appwrite, `deleteFile` is a function used to delete a file from the storage. It removes the specified file from the storage system associated with your Appwrite project. This function helps in managing the files uploaded to your Appwrite server by allowing you to remove unwanted or unused files from the storage, freeing up space and keeping your storage organized. 

13. getFilePreview:- getFilePreview in Appwrite is a function used to retrieve a preview of a file, such as an image or a document, stored on the Appwrite server. This preview can be used to display a thumbnail or a small preview image of the file to users without having to download the entire file. Purpose: The getFilePreview method allows you to generate a preview for various types of files, such as images, documents, videos, etc., stored in the Appwrite storage service. Usage: You provide the file ID or path of the file for which you want to generate the preview. Return Value: The method returns the preview data, typically in the form of an image or thumbnail, which you can then display in your application UI.

#  Storing user data in a Redux store after fetching it from the server via an API request is a common and efficient approach for managing data in frontend applications. By following this approach, you minimize the number of API requests made to the server, which can improve the performance and responsiveness of your frontend application. Additionally, storing data in a centralized Redux store allows for better state management and facilitates data sharing between different parts of your application. Syncing with Server: Whenever there are changes to the user data that need to be persisted (e.g., user updates their profile), you can update the Redux store and then make the corresponding API request to update the data on the server. This ensures that the data in your frontend remains in sync with the server. Also, when user will logout simply delete all sessions and then update redux store as well.

# Created Redux Store and two slices one for authentication purposes and other is for posts. Basically, we have to store data taken from database somewhere so that whenever we need that we can easily get w/o making api request again to server and if user updates that data we will update it in store and then send and store updated data back to server.


# Creating Production Grade Components
1. Create Seperate Header and Footer files.
2. Create a index file and import all components there.
3. Created a seperate Container component that will have some class and will be used in every component to keep alignment same.
4. Seperating components based on logic or data involved in them.
5. Create a common button.
6. Created common button and then used forwardRef for passing reference.
7. We have created AuthLayout so that it only allows login users to access or interact with certain components.

# forwardRef:- forwardRef is a function provided by React that allows a parent component to pass a ref to one of its children components. It's commonly used when you want a child component to have access to a DOM element or a React component instance created by another child component or an external library. forwardRef takes a function component as an argument. This function component receives the ref as its second argument, which can then be forwarded to a DOM element or another component within the child component. So, it's not about passing a function, but about enabling a component to receive and forward a ref to its child component. This is often used in cases where direct access to the child component's instance or DOM node is needed from its parent component. so that means i can directly pass component like this also:- <Component />. In the Input component, you are using forwardRef to forward the ref received from the parent component to the <input> element inside the Input component. This allows the parent component to directly access and manipulate the <input> element, such as focusing it or accessing its properties. By using forwardRef, you're essentially making it possible for the parent component to interact with a specific DOM element inside the Input component, which is the <input> element in this case. So, when you use the ref attribute with the Input component in the parent component, it represents the <input> element itself, and you can perform imperative operations on it directly. This pattern is commonly used in React when you need to manage focus, handle form submission, or perform other operations that require direct access to DOM elements from parent components.

# In PostCard.jsx we have created a Link that shows a preview of the postcard using getFilePreview.

# React-Hook-Form
# useForm is a hook provided by the React Hook Form library, which is used for managing forms in React applications. It allows you to create a form instance, which can be used to control the behavior and state of your form. Here's a brief explanation of useForm and what it returns: Usage: You use the useForm hook at the top level of your functional component to initialize a form instance. Initialization: When you call useForm, it initializes the form instance with default settings and configurations. You can optionally pass configuration options as an object to customize the behavior of the form.

# handleSubmit takes a callback function as its argument, which will be executed when the form is submitted and the form data is valid. It returns a function that handles form submissions, executing validation and invoking the callback function if the form is valid.

# The register function in React Hook Form is used to register form inputs (fields) with the form instance. It allows React Hook Form to track changes, perform validation, and manage the state of form inputs. Here's what register takes as arguments and returns: Arguments: name: (string) The name of the form input. This is used as the key to identify the input in the form data options: (object, optional) Configuration options for the input field. This can include validation rules, default values, etc. 
# Returns: A ref object: The register function returns a ref object, which is used to connect the form input to the form instance. This ref is then passed to the ref attribute of the form input element. The register function in React Hook Form returns an object with several properties that can be spread using the spread operator {...}. These properties are used to configure and control the behavior of the registered form input field. Here are some of the commonly used properties returned by register: red, onChange, onBlur, value, name, required, pattern, and many more. We can customly mention attributes that we want in second arguments that is options. 
#  React Hook Form internally manages the changes and updates the value of the input fields without the need for explicitly using onChange handlers and useState hooks. While the implementation details may vary, React Hook Form likely utilizes React's internal state management mechanisms to achieve this.
# When you use the register function from React Hook Form, you don't need to explicitly use useRef to provide a ref to the form input field. The register function takes care of that internally and returns a ref object that should be assigned directly to the ref attribute of the input field. This ref object handles the connection between the input field and the React Hook Form instance, allowing React Hook Form to track changes, perform validation, and manage the state of the input field.

# Authentication Layout:-
write reason after understanding.

# Controller of react-hook-form
<!-- We import the useForm and Controller components from react-hook-form, as well as the DatePicker component from the react-datepicker library.
Inside the form component, we use the Controller component to wrap the DatePicker component. We specify the name, control, and defaultValue props for the Controller.
In the render prop of the Controller, we define how to render the DatePicker component. We spread the field prop provided by React Hook Form onto the DatePicker, ensuring that the component is fully controlled by React Hook Form.
We handle the date change event in the DatePicker component and pass the selected date to the onChange function provided by React Hook Form through the field.onChange method.
By using the Controller component, we seamlessly integrate the third-party date picker library into our form, while still leveraging the form management capabilities of React Hook Form, such as state management, validation, and form submission handling. This allows for a cleaner and more maintainable codebase, as well as better integration with React Hook Form's features. -->


# The name attribute passed to register (in this case, 'image') corresponds to the key under which the uploaded image file(s) will be stored in the form data object. 
We define an onSubmit function that will be called when the form is submitted. Inside this function, we access the uploaded image file(s) from the form data object using the specified name ('image') and process it further as needed. (   {...register("image", { required: !post })})

# Making pages seperaetely

# Debugging:-
1. Error:- Failed to construct 'URL': Invalid URL
solve:- Remove semi-colon (;) from .env
2. this.account.createEmailSession is not a function:- replaced it with this.account.createEmailPasswordSession
3. Login button not working:- because of validation in matchPattern
4. Tiny MCE API Error:- apiKey = 'j4rq5d6kvq4h6oop3mg8nny9rbv0jx4y5oglhepn5dakfmkj' added api key in Editor as a attribute.
5. deleteFile file not found:- forgot to add return in updatePost. So, check for returns as well.

Steps for Project:- 
1. app write setup
2. Env and appwrite
3. build authentication service
4. database, storage, query services
5. redux toolkit for posts and authentication.
6. components designing
7. react hook form
8. adding form and slug values
9. building pages
10. CORS and Debugging

