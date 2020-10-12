// eslint-disable-next-line no-unused-vars
export const employees = [
    {
        "ID": "2748272849",
        "firstName": "John",
        "lastName": "Baran",
        "Email": "john@yahoo.com",
        "phoneNumber": "(263)-555-8838",
        "Salary": "$75,000",
        "Position": "Engineer",
        "Address": {
            "Street": "1234 Walnut Ave",
            "City": "Flint",
            "State": "Michigan",
            "Zipcode": "48501",
        },
        "managerID": "1739310389",
        "dept": "Engineering",
        "emergencyName": "Kevin Smith",
        "emergencyNumber": "(263)-555-8675",
    },
    {
        "ID": "8393810009",
        "firstName": "Zara",
        "lastName": "Pennington",
        "Email": "zara@gmail.com",
        "phoneNumber": "(810)-555-6631",
        "Salary": "$115,000",
        "Position": "Chief Financial Officer",
        "Address": {
            "Street": "7378 Stone Rd",
            "City": "Howell",
            "State": "Michigan",
            "Zipcode": "48843",
        },
        "managerID": "",
        "dept": "Finance",
        "emergencyName": "Daniel Pennington",
        "emergencyNumber": "(810)-555-8767",
    },
    {
        "ID": "7370821829",
        "firstName": "Eric",
        "lastName": "Owens",
        "Email": "eric@gmail.com",
        "phoneNumber": "(246)-555-3827",
        "Salary": "$52,000",
        "Position": "Accountant",
        "Address": {
            "Street": "3829 Martin St",
            "City": "Detroit",
            "State": "Michigan",
            "Zipcode": "48127",
        },
        "managerID": "8393810009",
        "dept": "Finance",
        "emergencyName": "Marie Owens",
        "emergencyNumber": "(246)-555-9856",
    },
    {
        "ID": "1739310389",
        "firstName": "Ashley",
        "lastName": "Opec",
        "Email": "ashley@gmail.com",
        "phoneNumber": "(966)-555-4726",
        "Salary": "$105,000",
        "Position": "Chief Engineer",
        "Address": {
            "Street": "735 W Franklin St",
            "City": "Flint",
            "State": "Michigan",
            "Zipcode": "48501",
        },
        "managerID": "",
        "dept": "Engineering",
        "emergencyName": "Gabriel Opec",
        "emergencyNumber": "(966)555-8480",
    },
    {
        "ID": "8826619309",
        "firstName": "Kyle",
        "lastName": "Richmond",
        "Email": "kyle@yahoo.com",
        "phoneNumber": "(248)-555-3627",
        "Salary": "$103,000",
        "Position": "Legal Counsel",
        "Address": {
            "Street": "5112 Jefferson Ave",
            "City": "Rochester",
            "State": "Michigan",
            "Zipcode": "48306",
        },
        "managerID": "9008332356",
        "dept": "Legal",
        "emergencyName": "Danielle Stevens",
        "emergencyNumber": "(248)-555-3098",
    }
];


export const employeeTimeOffs = [
    {
        "employeeId": "2748272849",
        "totalHours": 160,
        "hoursRemaining": 80,
        "availability": {
            "Monday": "9am-5pm",
            "Tuesday": "9am-5pm",
            "Wednesday": "9am-5pm",
            "Thursday": "9am-5pm",
            "Friday": "9am-3pm",
            "Saturday": "",
            "Sunday": ""
        },
        "timeOffs": [
            {
                "data": "2020-10-20",
                "time": "9am-5pm"
            },
            {
                "data": "2020-11-02",
                "time": "9am-5pm"
            }
        ]
    },
    {
        "employeeId": "8393810009",
        "totalHours": 100,
        "hoursRemaining": 16,
        "availability": {
            "Monday": "9am-5pm",
            "Tuesday": "",
            "Wednesday": "9am-5pm",
            "Thursday": "",
            "Friday": "9am-3pm",
            "Saturday": "",
            "Sunday": ""
        },
        "timeOffs": [
            {
                "data": "2020-10-21",
                "time": "9am-5pm"
            },
            {
                "data": "2020-11-04",
                "time": "9am-12pm"
            }
        ]
    },
    {
        "employeeId": "7370821829",
        "totalHours": 160,
        "hoursRemaining": 150,
        "availability": {
            "Monday": "9am-5pm",
            "Tuesday": "9am-5pm",
            "Wednesday": "9am-5pm",
            "Thursday": "",
            "Friday": "9am-3pm",
            "Saturday": "9am-5pm",
            "Sunday": ""
        },
        "timeOffs": [
            {
                "data": "2020-11-28",
                "time": "9am-5pm"
            }
        ]
    },
    {
        "employeeId": "1739310389",
        "totalHours": 50,
        "hoursRemaining": 0,
        "availability": {
            "Monday": "",
            "Tuesday": "9am-5pm",
            "Wednesday": "",
            "Thursday": "9am-5pm",
            "Friday": "",
            "Saturday": "",
            "Sunday": ""
        },
        "timeOffs": []
    },
    {
        "employeeId": "8826619309",
        "totalHours": 150,
        "hoursRemaining": 16,
        "availability": {
            "Monday": "9am-5pm",
            "Tuesday": "",
            "Wednesday": "9am-5pm",
            "Thursday": "",
            "Friday": "9am-3pm",
            "Saturday": "",
            "Sunday": ""
        },
        "timeOffs": [
            {
                "data": "2020-11-09",
                "time": "9am-5pm"
            },
            {
                "data": "2020-11-11",
                "time": "9am-5pm"
            },
            {
                "data": "2020-11-13",
                "time": "9am-5pm"
            }
        ]
    },
];