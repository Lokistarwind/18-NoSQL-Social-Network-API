const connection = require('../config/connection');
//const { Course, Student } = require('../models');
const { User, Thought } = require('../models');
const { getRandomName, getRandomAssignments } = require('./data');

const userData = [
'Konata_Izumi',
'Kagami_Hiiragi',
'Tsukasa_Hiiragi',
'Miyuki_Takara',
'Yutaka_Kobayakawa',
'Ayano_Minegishi',
'Misao_Kusakabe',
'Minami_Iwasaki',
'Yui_Narumi',
'Hiyori_Tamura'
];

const emailData = [
  'moegirlwithglasses@yahoo.com',
  'tsunderebakka@gmail.com',
  'calmyellowbow@gmail.com',
  'meganekko@proton.me',
  'tinypigtails@yahoo.com',
  'yamatonadeshiko@yahoo.com',
  'libby.stein.torres@gmail.com',
  'tallkuudere@proton.me',
  'initialdpd@saitamaprefect.gov',
  'hiyorindojin@yahoo.com',
]

const thoughtTextData = [
  'I wonder which part of the chocolate cornet is the top and which is the bottom',
  'I am thinking about cutting my hair',
  'I get sleepy when I concentrate too hard on studying',
  'I know I should go to the dentist, but the thought of the drills makes me hesitant',
  'I get sick easily but try my best',
  'Being the class rep is a lot of work, but quite fulfilling',
  "I've been told I have a very recognizable voice. I wonder why is that?",
  'Hi there.',
  'Seeing a starting pistol is what made me want to be a cop in the first place',
  'An artist hand is thier life'
]


connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('users');
    }

    let thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtsCheck.length) {
      await connection.dropCollection('thoughts');
    }

    const userModelData = [];
    //const ThoughtModelData = [];

    for(let i = 0; i < userData.length; i++)
    {
      let username = userData[i];
      let email =emailData[i];
      userModelData.push({
        username,
        email
      });
    }

    await User.collection.insertMany(userModelData);

    
    // for(let i = 0; i < userModelData.length; i++)
    // {
    //   let username = userData[i];
    //   let userId  =userModelData[i]._id.toString();
    //   let thoughtText = thoughtTextData[i];
    //   ThoughtModelData.push({
    //     thoughtText,
    //     username,
    //     userId
    //   });

    //}

    //not feasible since I don't know userId of thoughts made. Only doable when using insomnia
    //await Thought.collection.insertMany(ThoughtModelData);


  //   // Delete the collections if they exist
  //   let courseCheck = await connection.db.listCollections({ name: 'courses' }).toArray();
  //   if (courseCheck.length) {
  //     await connection.dropCollection('courses');
  //   }

  //   let studentsCheck = await connection.db.listCollections({ name: 'students' }).toArray();
  //   if (studentsCheck.length) {
  //     await connection.dropCollection('students');
  //   }


  // // Create empty array to hold the students
  // const students = [];

  // // Loop 20 times -- add students to the students array
  // for (let i = 0; i < 20; i++) {
  //   // Get some random assignment objects using a helper function that we imported from ./data
  //   const assignments = getRandomAssignments(20);

  //   const fullName = getRandomName();
  //   const first = fullName.split(' ')[0];
  //   const last = fullName.split(' ')[1];
  //   const github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

  //   students.push({
  //     first,
  //     last,
  //     github,
  //     assignments,
  //   });
  // }

  // // Add students to the collection and await the results
  // await Student.collection.insertMany(students);

  // // Add courses to the collection and await the results
  // await Course.collection.insertOne({
  //   courseName: 'UCLA',
  //   inPerson: false,
  //   students: [...students],
  // });

  // // Log out the seed data to indicate what should appear in the database
  console.table(userModelData);
  //console.table(ThoughtModelData);
  console.info('Seeding complete! 🌱');
   process.exit(0);
});



