import React from 'react'
import renderer from 'react-test-renderer'
import {HashRouter as Router} from 'react-router-dom'
import SpotList from './SpotList'



//Spot List for all spots
const mockGeneralSpots = [
    {   
        "id": 0,
        "author":  "paco123",
        "title": "Entry 1",
        "description": "Hello World, this is the first entry in thinkspot. Thinkspot is intended to be a collaborative site for brainstorming great ideas.",
        "posts": [
            {
                "id": 0,
                "author": "alin123",
                "post": "This is the first reply", 
                "comments": [
                    {
                        "id": 0,
                        "author": "bp",
                        "comment": "First comment made by bp"
                    }
                ]   
            },
            {
                "id": 1,
                "author": "sponge1",
                "post": " is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                "comments": []
            },
            {
                "id": 2,
                "author": "bp",
                "post": "Writing a third reply from bp",
                "comments": []
            }
        ]
    },
    {
        "id": 1,
        "author":  "paco123",
        "title": "Entry 2",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "posts": []
    },
    {
        "id": 2,
        "author":  "sponge1",
        "title": "Entry 3",
        "description": "First entry assigned to SpongeBob",
        "posts": []
    },
    {
        "id": 3,
        "author":  "bp",
        "title": "Entry 4",
        "description": "First entry assigned to Bob Proctor",
        "posts": []
    }
]

//Spot List for all spots
const mockUsersSpots = [
    {   
        "id": 0,
        "author":  "paco123",
        "title": "Entry 1",
        "description": "Hello World, this is the first entry in thinkspot. Thinkspot is intended to be a collaborative site for brainstorming great ideas.",
        "posts": [
            {
                "id": 0,
                "author": "alin123",
                "post": "This is the first reply", 
                "comments": [
                    {
                        "id": 0,
                        "author": "bp",
                        "comment": "First comment made by bp"
                    }
                ]   
            },
            {
                "id": 1,
                "author": "sponge1",
                "post": " is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                "comments": []
            },
            {
                "id": 2,
                "author": "bp",
                "post": "Writing a third reply from bp",
                "comments": []
            }
        ]
    },
    {
        "id": 1,
        "author":  "paco123",
        "title": "Entry 2",
        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "posts": []
    },
]


it('snapshot: SpotList for Home component', () => {
    const snapshot = renderer
        .create(
        <Router>
            <SpotList spots={mockGeneralSpots}/>
        </Router>
        ).toJSON()
    expect(snapshot).toMatchSnapshot()
})

it('functional: SpotList for Home component renders 4 spotLinks for 4 spots', () => {
    const rootInstance = renderer
    .create(
    <Router>
        <SpotList spots={mockGeneralSpots}/>
    </Router>
    ).root

    const spotLinks = rootInstance.findAllByType('a')
    expect(spotLinks.length).toBe(4)

})

it('snapshot: SpotList for MySpot Component', () => {
    const tree2 = renderer
        .create(
        <Router>
            <SpotList spots={mockUsersSpots}/>
        </Router>
        )
        .toJSON()
    expect(tree2).toMatchSnapshot()
})

it('functioanl: SpotList for Home component renders 2 author headers for the 2 spots and that the authors are the same', () => {
    const rootInstance = renderer
    .create(
    <Router>
        <SpotList spots={mockUsersSpots}/>
    </Router>
    ).root

    const authorTags = rootInstance.findAllByType('h3')
    expect(authorTags.length).toBe(2)

    authorTags.forEach((authorTag) => { 
        expect(authorTag.props.children).toBe("paco123")
    })

})