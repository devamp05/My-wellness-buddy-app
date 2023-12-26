const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://team34:cmpt370@cluster0.hjo6ufs.mongodb.net/?retryWrites=true&w=majority";
const User = require('./User');

class UserManager {

  constructor() {
    //this.userHash = null;
    //this.usr = null;
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    this.db = this.client.db('test');
    this.Users = this.db.collection('Users');
  }


  /*
    Parameters: 
      username
      password
    Return: None
    Post-Conditions: Adds a new User Object to the Users collection in the database
  */
  async createUser(username, password) {
    const userHash = username + password;
    const usr = new User(username,'', 0, 0, 0, userHash, '');

    // check if the user already exists
    if(userExists(this.client, username) == true){
      console.log('User Already Exists');
    }else{
      try {
        await this.client.connect();
        const result = await this.Users.insertOne(usr);
        console.log(`Document inserted with ID: ${result.insertedId}`);
      } catch (err) {
        console.error('Error inserting User: ', err);
      } finally {
        await this.client.close();
      }
    }
  }


  /*
    Parameters: 
      username
      password
    Return: The User's Object Id if the User exists, null otherwise
    Post-Conditions: None
  */
  async retreiveUser(username, password) {
    const userHash = username + password;

    try {
      await this.client.connect();
      // MongoDB operations
      const User = await this.Users.findOne({ UserHash : userHash});
      //console.log(User);
      console.log(User._id);
      return User;
    } catch (err) {
      console.error('Error Retreiving User Id: ', err);
    } finally {
      await this.client.close();
    }
  }

  async deleteUser(username, password) {
    const userHash = username + password;


    try {
      await this.client.connect();

      this.Users.deleteOne({ UserHash : userHash});
      console.log(username,' Deleted');
    } catch (err) {
      console.error('Error Deleting User: ', err);
    } finally {
      await this.client.close();
    }
  }


}




async function userExists(client, username) {

  try {
    await client.connect();
    const db = await client.db('test');
    const collection = await db.collection('Users');


    const User = await collection.findOne({ Username: username });


    console.log("got here");
    console.log(User);

    //console.log(User);

    return (User !== null); // Return true if a User object is returned, false otherwise
  } catch (err) {
    //console.error('Error checking user existence:', err);
    return true; // Return true in case of an error
  } finally {
    await client.close();
  }
}


let Management = new UserManager();
//Management.createUser('OgoA6', '1q2w3e4r5t');
let user1 = Management.retreiveUser('OgoA1', '1q2w3e4r5t');

console.log(user1);
//Management.deleteUser('OgoA2', '1q2w3e4r5t');
