// eslint-disable-next-line no-unused-vars
export const employees = [
    {
        "id": 2748272849,
        "firstName": "John",
        "lastName": "Baran",
        "email": "john@yahoo.com",
        "phoneNumber": "(263)-555-8838",
        "salary": 75000,
        "position": "Engineer",
        "address": {
            "street": "1234 Walnut Ave",
            "city": "Flint",
            "state": "Michigan",
            "zipcode": "48501",
        },
        "managerID": 1739310389,
        "dept": "Engineering",
        "emergencyName": "Kevin Smith",
        "emergencyNumber": "(263)-555-8675",
    },
    {
        "id": 8393810009,
        "firstName": "Zara",
        "lastName": "Pennington",
        "email": "zara@gmail.com",
        "phoneNumber": "(810)-555-6631",
        "salary": 115000,
        "position": "Chief Financial Officer",
        "address": {
            "street": "7378 Stone Rd",
            "city": "Howell",
            "state": "Michigan",
            "zipcode": "48843",
        },
        "managerID": 1000000000,
        "dept": "Finance",
        "emergencyName": "Daniel Pennington",
        "emergencyNumber": "(810)-555-8767",
    },
    {
        "id": 7370821829,
        "firstName": "Eric",
        "lastName": "Owens",
        "email": "eric@gmail.com",
        "phoneNumber": "(246)-555-3827",
        "salary": 52000,
        "position": "Accountant",
        "address": {
            "street": "3829 Martin St",
            "city": "Detroit",
            "state": "Michigan",
            "zipcode": "48127",
        },
        "managerID": 8393810009,
        "dept": "Finance",
        "emergencyName": "Marie Owens",
        "emergencyNumber": "(246)-555-9856",
    },
    {
        "id": 1739310389,
        "firstName": "Ashley",
        "lastName": "Opec",
        "email": "ashley@gmail.com",
        "phoneNumber": "(966)-555-4726",
        "salary": 105000,
        "position": "Chief Engineer",
        "address": {
            "street": "735 W Franklin St",
            "city": "Flint",
            "state": "Michigan",
            "zipcode": "48501",
        },
        "managerID": 588929843,
        "dept": "Engineering",
        "emergencyName": "Gabriel Opec",
        "emergencyNumber": "(966)555-8480",
    },
    {
        "id": 8826619309,
        "firstName": "Kyle",
        "lastName": "Richmond",
        "email": "kyle@yahoo.com",
        "phoneNumber": "(248)-555-3627",
        "salary": 103000,
        "position": "Legal Counsel",
        "address": {
            "street": "5112 Jefferson Ave",
            "city": "Rochester",
            "state": "Michigan",
            "zipcode": "48306",
        },
        "managerID": 9008332356,
        "dept": "Legal",
        "emergencyName": "Danielle Stevens",
        "emergencyNumber": "(248)-555-3098",
    }
];

// Week starts on Monday (index 0)
export const employeeTimeOffs = [
    {
        "employeeId": "2748272849",
        "totalHours": 160,
        "hoursRemaining": 80,
        "availability": [
            "9am-5pm",
            "9am-5pm",
            "9am-5pm",
            "9am-5pm",
            "9am-3pm",
            "",
            ""
        ],
        "timeOffs": [
            {
                "start": "2020-11-02 09:00",
                "end": "2020-11-02 17:00",
                "approved": "true"
            },
            {
                "start": "2020-11-20 09:00",
                "end": "2020-11-20 17:00",
                "approved": "false"
            }
        ]
    },
    {
        "employeeId": "8393810009",
        "totalHours": 100,
        "hoursRemaining": 16,
        "availability": [
            "9am-5pm",
            "",
            "9am-5pm",
            "",
            "9am-3pm",
            "",
            ""
        ],
        "timeOffs": [
            {
                "start": "2020-11-02 00:00",
                "end": "2020-11-20 23:59",
                "approved": "true"
            },
            {
                "start": "2020-12-18 09:00",
                "end": "2020-12-18 14:00",
                "approved": "false"
            }
        ]
    },
    {
        "employeeId": "7370821829",
        "totalHours": 160,
        "hoursRemaining": 150,
        "availability": [
            "9am-5pm",
            "9am-5pm",
            "",
            "9am-5pm",
            "9am-3pm",
            "9am-5pm",
            ""
        ],
        "timeOffs": [
            {
                "start": "2020-12-01 14:00",
                "end": "2020-12-01 17:00",
                "approved": "false"
            },
            {
                "start": "2020-12-23 00:00",
                "end": "2021-01-02 23:59",
                "approved": "true"
            }
        ]
    },
    {
        "employeeId": "1739310389",
        "totalHours": 50,
        "hoursRemaining": 0,
        "availability": [
            "",
            "9am-5pm",
            "",
            "9am-5pm",
            "",
            "",
            ""
        ],
        "timeOffs": []
    },
    {
        "employeeId": "8826619309",
        "totalHours": 150,
        "hoursRemaining": 16,
        "availability": [
            "9am-5pm",
            "",
            "9am-5pm",
            "",
            "9am-3pm",
            "",
            ""
        ],
        "timeOffs": [
            {
                "start": "2020-12-01 00:00",
                "end": "2020-12-01 23:59",
                "approved": "true"
            },
            {
                "start": "2020-12-10 00:00",
                "end": "2020-12-14 23:59",
                "approved": "false"
            }
        ]
    },
];

export const employeeModeRedirects = [
    "/timeoff",
    "/employee",
    "/employees",
    "/newHire",
    "/feedbackList"
];

export const hrModeRedirects = [
    "/feedback",
    "/submitTimeoff"
];