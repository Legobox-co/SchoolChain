export default {
  currentUser: null,
  isAuthenticated: false,
  project:{
    currentproject: {
      id: 1,
      name : 'Project Spectre',
      created: new Date().toUTCString(),
      stats:{
        weekly:{
          completed: 40,
          failed: 30,
          incomplete: 12
        },
        monthly:{
          completed: 40,
          failed: 30,
          incomplete: 12
        }
      },
      deployments: [
        {
          id: '#eidnininsd',
          started: '15th June, 2018',
          author: 'Mozart',
          commit: '#4454ujnsd9n9wd9nsnd',
          status: 'success'
        },
        {
          id: '#eidnininsd',
          started: '15th June, 2018',
          author: 'Mozart',
          commit: '#4454ujnsd9n9wd9nsnd',
          status: 'failed'
        },
        {
          id: '#eidnininsd',
          started: '15th June, 2018',
          author: 'Mozart',
          commit: '#4454ujnsd9n9wd9nsnd',
          status: 'success'
        },
        {
          id: '#eidnininsd',
          started: '15th June, 2018',
          author: 'Mozart',
          commit: '#4454ujnsd9n9wd9nsnd',
          status: 'success'
        },
        {
          id: '#eidnininsd',
          started: new Date('15th June, 2018').toUTCString(),
          author: 'Mozart',
          commit: '#4454ujnsd9n9wd9nsnd',
          status: 'failed'
        },
        {
          id: '#eidnininsd',
          started: new Date('15th June, 2018').toUTCString(),
          author: 'Mozart',
          commit: '#4454ujnsd9n9wd9nsnd',
          status: 'failed'
        },
        {
          id: '#eidnininsd',
          started: new Date('15th June, 2018').toUTCString(),
          author: 'Mozart',
          commit: '#4454ujnsd9n9wd9nsnd',
          status: 'failed'
        },
        {
          id: '#eidnininsd',
          started: new Date('15th June, 2018').toUTCString(),
          author: 'Mozart',
          commit: '#4454ujnsd9n9wd9nsnd',
          status: 'failed'
        },
      ],
      servers: [
        {
          ipaddress:'123.345.235.453',
          keypairs:{
            public: 'ssh-rsa 239nnh8wehwhd88wh8dhd8hd8h8hd8hdb88bb8d88w8db8d',
            private:'3974834378438748374394892328493489389473yh3h8fh83h3b8dh83hy43h74h7f783dh83d83bd838bd83b8d83d',
            lastUsed:new Date().toUTCString(),
          },
          created_at: new Date().toUTCString()
        }
      ],
      collaborators: [
        {
          user:{
            name: 'Andy james',
            profile_image:'https://profile_image_path',
            username: '@andrewJames'
          },
          role:'Admin',
        },
        {
          user:{
            name: 'Nelson Chills',
            profile_image:'https://profile_image_path',
            username: '@nellyChils'
          },
          role:'Owner',
        },
        {
          user:{
            name: 'Chibuike Emmanuel',
            profile_image:'https://profile_image_path',
            username: '@mozartted'
          },
          role:'Member',
        },
      ]
    },
    projects:[
      {
        id: 1,
        name : 'Project Spectre',
        created: new Date().toUTCString(),
        stats:{
          weekly:{
            completed: 10,
            failed: 3,
            incomplete: 40
          },
          monthly:{
            completed: 90,
            failed: 2,
            incomplete:16
          }
        },
        deployments: [
					{
						id: '#eidnininsd',
						started: '15th June, 2018',
						author: 'Mozart',
						commit: '#4454ujnsd9n9wd9nsnd',
						status: 'success'
					},
					{
						id: '#eidnininsd',
						started: '15th June, 2018',
						author: 'Mozart',
						commit: '#4454ujnsd9n9wd9nsnd',
						status: 'failed'
					},
					{
						id: '#eidnininsd',
						started: '15th June, 2018',
						author: 'Mozart',
						commit: '#4454ujnsd9n9wd9nsnd',
						status: 'success'
					},
					{
						id: '#eidnininsd',
						started: '15th June, 2018',
						author: 'Mozart',
						commit: '#4454ujnsd9n9wd9nsnd',
						status: 'success'
					},
					{
						id: '#eidnininsd',
						started: new Date('15th June, 2018').toUTCString(),
						author: 'Mozart',
						commit: '#4454ujnsd9n9wd9nsnd',
						status: 'failed'
					},
					{
						id: '#eidnininsd',
						started: new Date('15th June, 2018').toUTCString(),
						author: 'Mozart',
						commit: '#4454ujnsd9n9wd9nsnd',
						status: 'failed'
					},
					{
						id: '#eidnininsd',
						started: new Date('15th June, 2018').toUTCString(),
						author: 'Mozart',
						commit: '#4454ujnsd9n9wd9nsnd',
						status: 'failed'
					},
					{
						id: '#eidnininsd',
						started: new Date('15th June, 2018').toUTCString(),
						author: 'Mozart',
						commit: '#4454ujnsd9n9wd9nsnd',
						status: 'failed'
					},
        ],
        servers: [
          {
            ipaddress:'123.345.235.453',
            keypairs:{
              public: 'ssh-rsa 239nnh8wehwhd88wh8dhd8hd8h8hd8hdb88bb8d88w8db8d',
              private:'3974834378438748374394892328493489389473yh3h8fh83h3b8dh83hy43h74h7f783dh83d83bd838bd83b8d83d',
              lastUsed:new Date().toUTCString(),
            },
            created_at: new Date().toUTCString()
          }
        ],
        collaborators: [
					{
						user:{
							name: 'Andy james',
							profile_image:'https://profile_image_path',
							username: '@andrewJames'
						},
						role:'Admin',
					},
					{
						user:{
							name: 'Nelson Chills',
							profile_image:'https://profile_image_path',
							username: '@nellyChils'
						},
						role:'Owner',
					},
					{
						user:{
							name: 'Chibuike Emmanuel',
							profile_image:'https://profile_image_path',
							username: '@mozartted'
						},
						role:'Member',
					},
				]
      },
      {
        id: 2,
        name : 'Project Legobox',
        created: new Date().toUTCString(),
        stats:{
          weekly:{
            completed: 38,
            failed: 32,
            incomplete: 10
          },
          monthly:{
            completed:47,
            failed: 23,
            incomplete: 14
          }
        },
        deployments: [
					{
						id: '#eidnininsd',
						started: '15th June, 2018',
						author: 'Mozart',
						commit: '#4454ujnsd9n9wd9nsnd',
						status: 'success'
					},
					{
						id: '#eidnininsd',
						started: '15th June, 2018',
						author: 'Mozart',
						commit: '#4454ujnsd9n9wd9nsnd',
						status: 'failed'
					},
					{
						id: '#eidnininsd',
						started: '15th June, 2018',
						author: 'Mozart',
						commit: '#4454ujnsd9n9wd9nsnd',
						status: 'success'
					},
					{
						id: '#eidnininsd',
						started: '15th June, 2018',
						author: 'Mozart',
						commit: '#4454ujnsd9n9wd9nsnd',
						status: 'success'
					},
					{
						id: '#eidnininsd',
						started: new Date('15th June, 2018').toUTCString(),
						author: 'Mozart',
						commit: '#4454ujnsd9n9wd9nsnd',
						status: 'failed'
					},
					{
						id: '#eidnininsd',
						started: new Date('15th June, 2018').toUTCString(),
						author: 'Mozart',
						commit: '#4454ujnsd9n9wd9nsnd',
						status: 'failed'
					},
					{
						id: '#eidnininsd',
						started: new Date('15th June, 2018').toUTCString(),
						author: 'Mozart',
						commit: '#4454ujnsd9n9wd9nsnd',
						status: 'failed'
					},
					{
						id: '#eidnininsd',
						started: new Date('15th June, 2018').toUTCString(),
						author: 'Mozart',
						commit: '#4454ujnsd9n9wd9nsnd',
						status: 'failed'
					},
        ],
        servers: [
          {
            ipaddress:'123.345.235.453',
            keypairs:{
              public: 'ssh-rsa 239nnh8wehwhd88wh8dhd8hd8h8hd8hdb88bb8d88w8db8d',
              private:'3974834378438748374394892328493489389473yh3h8fh83h3b8dh83hy43h74h7f783dh83d83bd838bd83b8d83d',
              lastUsed:new Date().toUTCString(),
            },
            created_at: new Date().toUTCString()
          }
        ],
        collaborators: [
					{
						user:{
							name: 'Andy james',
							profile_image:'https://profile_image_path',
							username: '@andrewJames'
						},
						role:'Admin',
					},
					{
						user:{
							name: 'Nelson Chills',
							profile_image:'https://profile_image_path',
							username: '@nellyChils'
						},
						role:'Owner',
					},
					{
						user:{
							name: 'Chibuike Emmanuel',
							profile_image:'https://profile_image_path',
							username: '@mozartted'
						},
						role:'Member',
					},
				]
      },
      {
        id: 3,
        name : 'Project Lodgeandroom',
        created: new Date().toUTCString(),
        stats:{
          weekly:{
            completed: 40,
            failed: 30,
            incomplete: 12
          },
          monthly:{
            completed: 40,
            failed: 30,
            incomplete: 12
          }
        },
        deployments: [
					{
						id: '#eidnininsd',
						started: '15th June, 2018',
						author: 'Mozart',
						commit: '#4454ujnsd9n9wd9nsnd',
						status: 'success'
					},
					{
						id: '#eidnininsd',
						started: '15th June, 2018',
						author: 'Mozart',
						commit: '#4454ujnsd9n9wd9nsnd',
						status: 'failed'
					},
					{
						id: '#eidnininsd',
						started: '15th June, 2018',
						author: 'Mozart',
						commit: '#4454ujnsd9n9wd9nsnd',
						status: 'success'
					},
					{
						id: '#eidnininsd',
						started: '15th June, 2018',
						author: 'Mozart',
						commit: '#4454ujnsd9n9wd9nsnd',
						status: 'success'
					},
					{
						id: '#eidnininsd',
						started: new Date('15th June, 2018').toUTCString(),
						author: 'Mozart',
						commit: '#4454ujnsd9n9wd9nsnd',
						status: 'failed'
					},
					{
						id: '#eidnininsd',
						started: new Date('15th June, 2018').toUTCString(),
						author: 'Mozart',
						commit: '#4454ujnsd9n9wd9nsnd',
						status: 'failed'
					},
					{
						id: '#eidnininsd',
						started: new Date('15th June, 2018').toUTCString(),
						author: 'Mozart',
						commit: '#4454ujnsd9n9wd9nsnd',
						status: 'failed'
					},
					{
						id: '#eidnininsd',
						started: new Date('15th June, 2018').toUTCString(),
						author: 'Mozart',
						commit: '#4454ujnsd9n9wd9nsnd',
						status: 'failed'
					},
        ],
        servers: [
          {
            ipaddress:'123.345.235.453',
            keypairs:{
              public: 'ssh-rsa 239nnh8wehwhd88wh8dhd8hd8h8hd8hdb88bb8d88w8db8d',
              private:'3974834378438748374394892328493489389473yh3h8fh83h3b8dh83hy43h74h7f783dh83d83bd838bd83b8d83d',
              lastUsed:new Date().toUTCString(),
            },
            created_at: new Date().toUTCString()
          }
        ],
        collaborators: [
					{
						user:{
							name: 'Andy james',
							profile_image:'https://profile_image_path',
							username: '@andrewJames'
						},
						role:'Admin',
					},
					{
						user:{
							name: 'Nelson Chills',
							profile_image:'https://profile_image_path',
							username: '@nellyChils'
						},
						role:'Owner',
					},
					{
						user:{
							name: 'Chibuike Emmanuel',
							profile_image:'https://profile_image_path',
							username: '@mozartted'
						},
						role:'Member',
					},
				]
      }
    ]
	},
	redirectUrl: "/home",
	
};
