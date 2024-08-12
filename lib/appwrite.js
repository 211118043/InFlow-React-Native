import { Account, Avatars, Client, Databases, ID, Query ,Storage} from 'react-native-appwrite';
export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.reactnative.inflow',
    projectId: '66a23808000bdc12bc2b',
    databaseId: '66a23ba40002ef877944',
    userCollectionId: '66a23c150037042b2d5b',
    videoCollectionId: '66a23c1c0014aba43cd1',
    storageId: '66a23f45000975027364'
}
const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId
} = config;

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

// Register User
export async function createUser(email, password, username) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if (!newAccount) throw Error;
        const avatarUrl = avatars.getInitials(username)
        await signIn(email, password)
        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl,
            }
        )
        return newUser;
    }
    catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

// Sıgn In
export async function signIn(email, password) {
    try {

        const session = await account.createEmailSession(email, password);
        return session;
    }
    catch (error) {
        throw new Error(error);
    }

}

// Get Account
export async function getAccount() {
    try {
        const currentAccount = await account.get();

        return currentAccount;
    } catch (error) {
        throw new Error(error);
    }
}

// Get Current User
export async function getCurrentUser() {
    try {

        const currentAccount = await getAccount();
        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );

        if (!currentUser) throw Error;
        return currentUser.documents[0]

    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
}

// Sign Out
export async function signOut() {
    try {
        const session = await account.deleteSession("current");

        return session;
    } catch (error) {
        throw new Error(error);
    }
}


export async function getAllPosts() {
    try {
        const posts = await databases.listDocuments(
            databaseId, //config.databaseId yapmamak için yukarıda consta çektik config i   
            videoCollectionId,
            [Query.orderDesc('$createdAt')] //videoları son yüklenenden ilk yüklenene doru sıralamak için yazdık buraya
        )
        return posts.documents;
    }
    catch (error) {
        throw new Error(error);
    }
}

export async function getLatestPosts() {
    try {
        const posts = await databases.listDocuments(
            databaseId, //config.databaseId yapmamak için yukarıda consta çektik config i   
            videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )
        return posts.documents;
    }
    catch (error) {
        throw new Error(error);
    }
}

export async function searchPosts(query) {
    try {
        const posts = await databases.listDocuments(
            databaseId, //config.databaseId yapmamak için yukarıda consta çektik config i   
            videoCollectionId,
            [Query.search('title', query)]
        )
        return posts.documents;
    }
    catch (error) {
        throw new Error(error);
    }
}

export async function getUserPosts(userId) {
    try {
        const posts = await databases.listDocuments(
            databaseId, //config.databaseId yapmamak için yukarıda consta çektik config i   
            videoCollectionId,
            [Query.equal('creator', userId)]
        )
        return posts.documents;
    }
    catch (error) {
        throw new Error(error);
    }
}

// Upload File
export async function uploadFile(file, type) {
    if (!file) return;
  
   
    const asset = {
        name:file.fileName,
        type:file.mimeType,
        size:file.fileSize,
        uri:file.uri
     };
  
    try {
      const uploadedFile = await storage.createFile(
        config.storageId,
        ID.unique(),
        asset
      );
  
      const fileUrl = await getFilePreview(uploadedFile.$id, type);
      return fileUrl;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Get File Preview
  export async function getFilePreview(fileId, type) {
    let fileUrl;
  
    try {
      if (type === "video") {
        fileUrl = storage.getFileView(config.storageId, fileId);
      } else if (type === "image") {
        fileUrl = storage.getFilePreview(
          config.storageId,
          fileId,
          2000,
          2000,
          "top",
          100
        );
      } else {
        throw new Error("Invalid file type");
      }
  
      if (!fileUrl) throw Error;
  
      return fileUrl;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Create Video Post
  export async function createVideoPost(form) {
    try {
      const [thumbnailUrl, videoUrl] = await Promise.all([
        uploadFile(form.thumbnail, "image"),
        uploadFile(form.video, "video"),
      ]);
  
      const newPost = await databases.createDocument(
        config.databaseId,
        config.videoCollectionId,
        ID.unique(),
        {
          title: form.title,
          thumbnail: thumbnailUrl,
          video: videoUrl,
          prompt: form.prompt,
          creator: form.userId,
        }
      );
  
      return newPost;
    } catch (error) {
      throw new Error(error);
    }
  }
  