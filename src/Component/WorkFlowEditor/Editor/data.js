const taskData = [
  // {
  //   "Genaral": [
  //     {
  //       "TaskID": "AITSK006",
  //       "TaskName": "If Condition",
  //       "FormInputs": [
  //         {
  //           "label": "True Condition",
  //           "type": "text"
  //         },
  //         {
  //           "label": "False Condition",
  //           "type": "text"
  //         }
  //       ]
  //     },
  //     {
  //       "TaskID": "AITSK007",
  //       "TaskName": "Timer",
  //       "FormInputs": [
  //         {
  //           "label": "Set Timer",
  //           "type": "number"
  //         }
  //       ]
  //     }
  //   ]
  // },  
  {
      "WINDOWS": [
        {
          "TaskID": "AITSK001",
          "TaskName": "Service Restart",
          "FormInputs": [
            {
              "label": "Service Name",
              "type": "text"
            },
            {
              "label": "Server Name",
              "type": "text"
            }
          ]
        },
        {
          "TaskID": "AITSK002",
          "TaskName": "Get Hostname",
          "FormInputs": [
            {
              "label": "Server Name",
              "type": "text"
            }
          ]
        }
      ]
    },
    {
      "AWS": [
        {
          "TaskID": "AITSK003",
          "TaskName": "S3 File Download",
          "FormInputs": [
            {
              "label": "Bucket Name",
              "type": "text"
            },
            {
              "label": "File Name",
              "type": "text"
            },
            {
              "label": "Local Path",
              "type": "text"
            }
          ]
        },
        {
          "TaskID": "AITSK004",
          "TaskName": "Start EC2 Instance",
          "FormInputs": [
            {
              "label": "Instance ID",
              "type": "text"
            }
          ]
        },
        {
            "TaskID": "AITSK005",
            "TaskName": "Start EC2 Test",
            "FormInputs": [
              {
                "label": "Instance ID",
                "type": "text"
              }
            ]
          }
      ]
    },
    {
      "Kamesh": [
        {
          "TaskID": "AITSK006",
          "TaskName": "S3 File Download",
          "FormInputs": [
            {
              "label": "Bucket Name",
              "type": "text"
            },
            {
              "label": "File Name",
              "type": "text"
            },
            {
              "label": "Local Path",
              "type": "text"
            }
          ]
        },
        {
          "TaskID": "AITSK004",
          "TaskName": "Start EC2 Instance",
          "FormInputs": [
            {
              "label": "Instance ID",
              "type": "text"
            }
          ]
        },
        {
            "TaskID": "AITSK004",
            "TaskName": "Start EC2 Test",
            "FormInputs": [
              {
                "label": "Instance ID",
                "type": "text"
              }
            ]
          }
      ]
    }
  ];
  
  export default taskData;
  