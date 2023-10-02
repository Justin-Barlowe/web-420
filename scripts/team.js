// Name: Justin Barlowe
// Title: barlowe-composer-routes.js
// Description: Team script for Web-420 Capstone Projects
// Date Created: 10/2/2023

const db = db.getSiblingDB('web420DB');

// Drop the existing 'teams' collection if it exists
db.teams.drop();

// Initialize a team with players
const team1 = {
    name: 'Carolina Panthers',
    mascot: 'Panther',
    players: [
        {
            firstName: 'Brain',
            lastName: 'Burns',
            salary: 16012000
        },
        {
            firstName: 'Taylor',
            lastName: 'Moton',
            salary: 1080000
        },
        {
            firstName: 'Derrick',
            lastName: 'Brown',
            salary: 2331101
        },
        {
            firstName: 'Donte',
            lastName: 'Jackson',
            salary: 1080000
        }
    ]
};

const team2 = {
    name: 'Arizona Cardinals',
    mascot: 'Cardinal',
    players: [
        {
            firstName: 'Kyler',
            lastName: 'Murray',
            salary: 6100000
        },
        {
            firstName: 'DeAndre',
            lastName: 'Hopkins',
            salary: 27500000
        },
        {
            firstName: 'Chandler',
            lastName: 'Jones',
            salary: 19500000
        },
        {
            firstName: 'Budda',
            lastName: 'Baker',
            salary: 14000000
        }
    ]
};

const team3 = {
    name: 'Buffalo Bills',
    mascot: 'Bison',
    players: [
        {
            firstName: 'Josh',
            lastName: 'Allen',
            salary: 6100000
        },
        {
            firstName: 'Stefon',
            lastName: 'Diggs',
            salary: 27500000
        },
        {
            firstName: 'Tremaine',
            lastName: 'Edmunds',
            salary: 19500000
        },
        {
            firstName: 'Jordan',
            lastName: 'Poyer',
            salary: 14000000
        }
    ]
};

// Insert the team into the 'teams' collection
db.teams.insertOne(team1);
db.teams.insertOne(team2);
db.teams.insertOne(team3);

// Log success message
print('Database initialized with starting data.');
