import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { CardModule } from 'primeng/card';
import { OrganizationChartModule } from 'primeng/organizationchart';

@Component({
  selector: 'app-organization',
  standalone: true,
  imports: [
    OrganizationChartModule,
    BadgeModule,
    CardModule
  ],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.scss'
})
export class OrganizationComponent {
  positions = [
    {
      positionId: 'Chief Architect - 1',
      positionName: 'Chief Architect - 1',
      reportsTo: 'President',
      skillSet: [
        'Enterprise Architecture',
        'Strategic Technology Planning',
        'Solution Design',
        'Technical Leadership',
        'Cloud Architecture',
        'Enterprise Integration',
        'Technology Governance',
        'Kafka'
      ],
      division: 'Technology Strategy',
      location: 'Onsite',
      role: 'Senior Technology Strategist',
      responsibilities: [
        'Develop and maintain overall technical architecture strategy',
        'Lead technical vision and long-term technology roadmap',
        'Provide high-level architectural guidance across multiple technology domains',
        'Ensure alignment of technology solutions with business objectives',
        'Oversee technology innovation and emerging technology adoption',
        'Collaborate with executive leadership on strategic technology decisions'
      ]
    },
    {
      positionId: 'Chief Architect - 2',
      positionName: 'Chief Architect - 2',
      reportsTo: 'President',
      skillSet: [
        'Enterprise Architecture',
        'Solution Architecture',
        'Technology Strategy',
        'Enterprise Integration',
        'Digital Transformation',
        'Technical Risk Management',
        'System Design',
        'Kafka'
      ],
      division: 'Technology Strategy',
      location: 'Onsite',
      role: 'Enterprise Architecture Lead',
      responsibilities: [
        'Design and implement enterprise-wide architectural frameworks',
        'Develop technical standards and best practices',
        'Evaluate and recommend emerging technologies',
        'Manage architectural complexity and technical debt',
        'Provide technical leadership and mentorship',
        'Ensure architectural consistency across technology platforms'
      ]
    },
    {
      positionId: 'Java Lead - 1 - Onsite',
      positionName: 'Java Lead - Onsite',
      reportsTo: 'Chief Architect - 1',
      skillSet: [
        'Java Development',
        'Microservices Architecture',
        'Spring Framework',
        'Hibernate',
        'Agile Methodologies',
        'Team Leadership',
        'Performance Optimization',
        'Continuous Integration/Continuous Deployment (CI/CD)',
        'Kafka'
      ],
      division: 'Transportation Field & Train Management',
      location: 'Onsite',
      role: 'Java Development Team Lead',
      responsibilities: [
        'Lead and manage Java development team',
        'Design and implement complex Java-based solutions',
        'Mentor junior developers and provide technical guidance',
        'Ensure code quality and best practices',
        'Collaborate on architectural design and system integration',
        'Manage project deliverables and timelines'
      ]
    },
    {
      positionId: 'Java Support Engineer - Onsite',
      positionName: 'Java Support Engineer',
      reportsTo: 'Java Lead - 1 - Onsite',
      skillSet: [
        'Java Programming',
        'Troubleshooting',
        'Application Support',
        'Bug Fixing',
        'Spring Boot',
        'Database Management',
        'Debugging Techniques',
        'Kafka'
      ],
      division: 'Transportation Field & Train Management',
      location: 'Onsite',
      role: 'Java Application Support Specialist',
      responsibilities: [
        'Provide technical support for Java-based applications',
        'Diagnose and resolve application issues',
        'Perform system maintenance and updates',
        'Implement bug fixes and patches',
        'Collaborate with development team on application improvements',
        'Maintain system documentation and support logs'
      ]
    },
    {
      positionId: 'Java Lead - Offshore',
      positionName: 'Java Lead - 1',
      reportsTo: 'Chief Architect - 1',
      skillSet: [
        'Java Development',
        'Microservices Architecture',
        'Spring Framework',
        'Offshore Development Management',
        'Agile Methodologies',
        'Team Leadership',
        'Performance Optimization',
        'Continuous Integration/Continuous Deployment (CI/CD)',
        'Kafka'
      ],
      division: 'Transportation Field & Train Management',
      location: 'Offshore',
      role: 'Offshore Java Development Team Lead',
      responsibilities: [
        'Manage offshore Java development team',
        'Coordinate cross-location development efforts',
        'Implement best practices for remote team collaboration',
        'Oversee project delivery and quality',
        'Provide technical leadership and mentorship',
        'Ensure alignment with global development standards'
      ]
    },
    {
      positionId: 'Java Support Engineer - 1 - Offshore',
      positionName: 'Java Support Engineer',
      reportsTo: 'Java Lead - Offshore',
      skillSet: [
        'Java Programming',
        'Troubleshooting',
        'Application Support',
        'Bug Fixing',
        'Spring Boot',
        'Database Management',
        'Debugging Techniques',
        'Kafka'
      ],
      division: 'Transportation Field & Train Management',
      location: 'Offshore',
      role: 'Offshore Java Application Support Specialist',
      responsibilities: [
        'Provide remote technical support for Java-based applications',
        'Diagnose and resolve application issues',
        'Perform system maintenance and updates',
        'Implement bug fixes and patches',
        'Collaborate with global development team',
        'Maintain detailed support documentation'
      ]
    },
    {
      positionId: 'Java Support Engineer - 2 - Offshore',
      positionName: 'Java Support Engineer',
      reportsTo: 'Java Lead - Offshore',
      skillSet: [
        'Java Programming',
        'Troubleshooting',
        'Application Support',
        'Bug Fixing',
        'Spring Boot',
        'Database Management',
        'Debugging Techniques',
        'Kafka'
      ],
      division: 'Transportation Field & Train Management',
      location: '',
      role: 'Java Application Support Technician',
      responsibilities: [
        'Support Java application infrastructure',
        'Assist in troubleshooting complex technical issues',
        'Participate in application maintenance and improvement',
        'Contribute to knowledge base and support documentation',
        'Collaborate with onsite and offshore development teams'
      ]
    },
    {
      positionId: 'Java Support Engineer - 3 - Offshore',
      positionName: 'Java Support Engineer',
      reportsTo: 'Java Lead - Offshore',
      skillSet: [
        'Java Programming',
        'Troubleshooting',
        'Application Support',
        'Bug Fixing',
        'Spring Boot',
        'Database Management',
        'Debugging Techniques',
        'Kafka'
      ],
      division: 'Transportation Field & Train Management',
      location: 'Offshore',
      role: 'Java Support Engineer',
      responsibilities: [
        'Provide technical support for Java applications',
        'Conduct detailed system diagnostics',
        'Implement software patches and updates',
        'Assist in performance optimization',
        'Maintain system reliability and efficiency'
      ]
    },
    {
      positionId: 'Java Support Engineer - 4 - Offshore',
      positionName: 'Java Support Engineer',
      reportsTo: 'Java Lead - Offshore',
      skillSet: [
        'Java Programming',
        'Troubleshooting',
        'Application Support',
        'Bug Fixing',
        'Spring Boot',
        'Database Management',
        'Debugging Techniques',
        'Kafka'
      ],
      division: 'Transportation Field & Train Management',
      location: 'Offshore',
      role: 'Java Support Engineer',
      responsibilities: [
        'Support mission-critical Java applications',
        'Perform root cause analysis of technical issues',
        'Develop and implement solution strategies',
        'Ensure continuous application performance',
        'Collaborate with development teams'
      ]
    },
    {
      positionId: 'Java Support Engineer - 5 - Offshore',
      positionName: 'Java Support Engineer',
      reportsTo: 'Java Lead - Offshore',
      skillSet: [
        'Java Programming',
        'Troubleshooting',
        'Application Support',
        'Bug Fixing',
        'Spring Boot',
        'Database Management',
        'Debugging Techniques',
        'Kafka'
      ],
      division: 'Transportation Field & Train Management',
      location: 'Offshore',
      role: 'Java Support Engineer',
      responsibilities: [
        'Provide comprehensive Java application support',
        'Monitor system performance and health',
        'Implement proactive maintenance procedures',
        'Assist in technical problem resolution',
        'Support continuous improvement initiatives'
      ]
    },
    {
      positionId: 'Java Support Engineer - 6 - Offshore',
      positionName: 'Java Support Engineer',
      reportsTo: 'Java Lead - Offshore',
      skillSet: [
        'Java Programming',
        'Troubleshooting',
        'Application Support',
        'Bug Fixing',
        'Spring Boot',
        'Database Management',
        'Debugging Techniques',
        'Kafka'
      ],
      division: 'Transportation Field & Train Management',
      location: 'Offshore',
      role: 'Java Support Engineer',
      responsibilities: [
        'Manage Java application support lifecycle',
        'Conduct comprehensive system assessments',
        'Develop and implement technical solutions',
        'Provide expert-level troubleshooting',
        'Support system integration and optimization'
      ]
    },
    {
      positionId: 'Mainframe Lead - 1 - Onsite',
      positionName: 'Mainframe Lead - Onsite',
      reportsTo: 'Chief Architect - 1',
      skillSet: [
        'Mainframe Systems',
        'COBOL Programming',
        'IBM z/OS',
        'Team Leadership',
        'Systems Architecture',
        'Legacy System Integration',
        'Performance Optimization',
        'Kafka'
      ],
      division: 'Transportation Field & Train Management',
      location: 'Onsite',
      role: 'Mainframe Systems Team Lead',
      responsibilities: [
        'Lead and manage mainframe systems team',
        'Oversee mainframe infrastructure and operations',
        'Develop strategies for legacy system modernization',
        'Ensure system reliability and performance',
        'Mentor team members and provide technical guidance',
        'Coordinate with cross-functional technology teams'
      ]
    },
    {
      positionId: 'Mainframe Support Engineer - Onsite',
      positionName: 'Mainframe Support Engineer',
      reportsTo: 'Mainframe Lead - 1 - Onsite',
      skillSet: [
        'COBOL Programming',
        'Mainframe Systems',
        'IBM z/OS',
        'JCL (Job Control Language)',
        'Systems Monitoring',
        'Troubleshooting',
        'Batch Processing',
        'Kafka'
      ],
      division: 'Transportation Field & Train Management',
      location: 'Onsite',
      role: 'Mainframe Support Specialist',
      responsibilities: [
        'Provide technical support for mainframe systems',
        'Monitor and maintain system performance',
        'Execute and manage batch processing jobs',
        'Diagnose and resolve system-level issues',
        'Implement system updates and patches',
        'Maintain comprehensive system documentation'
      ]
    },
    {
      positionId: 'Mainframe Lead - Offshore',
      positionName: 'Mainframe Lead - 1',
      reportsTo: 'Chief Architect - 1',
      skillSet: [
        'Mainframe Systems',
        'COBOL Programming',
        'IBM z/OS',
        'Offshore Development Management',
        'Legacy System Integration',
        'Systems Architecture',
        'Performance Optimization',
        'Kafka'
      ],
      division: 'Transportation Field & Train Management',
      location: 'Offshore',
      role: 'Offshore Mainframe Systems Team Lead',
      responsibilities: [
        'Manage offshore mainframe systems team',
        'Develop offshore mainframe support strategies',
        'Coordinate global mainframe system operations',
        'Oversee system modernization initiatives',
        'Provide technical leadership and mentorship',
        'Ensure compliance with global technology standards'
      ]
    },
    // Remaining Mainframe Support Engineer positions would follow the same pattern with Kafka added to skillSet
    {
      positionId: 'Mainframe Support Engineer - 1 - Offshore',
      positionName: 'Mainframe Support Engineer',
      reportsTo: 'Mainframe Lead - Offshore',
      skillSet: [
        'COBOL Programming',
        'Mainframe Systems',
        'IBM z/OS',
        'JCL (Job Control Language)',
        'DB2 Database',
        'Batch Processing',
        'Troubleshooting',
        'Systems Monitoring',
        'Kafka'
      ],
      division: 'Transportation Field & Train Management',
      location: 'Offshore',
      role: 'Mainframe Support Technician',
      responsibilities: [
        'Provide technical support for mainframe systems',
        'Monitor system performance and resolve issues',
        'Perform routine system maintenance',
        'Execute batch job processing',
        'Manage and optimize database operations',
        'Ensure system reliability and availability'
      ]
    },
    {
      positionId: 'Mainframe Support Engineer - 2 - Offshore',
      positionName: 'Mainframe Support Engineer',
      reportsTo: 'Mainframe Lead - Offshore',
      skillSet: [
        'COBOL Programming',
        'Mainframe Systems',
        'IBM z/OS',
        'JCL (Job Control Language)',
        'DB2 Database',
        'Batch Processing',
        'Troubleshooting',
        'Systems Monitoring',
        'Kafka'
      ],
      division: 'Transportation Field & Train Management',
      location: 'Offshore',
      role: 'Mainframe Support Technician',
      responsibilities: [
        'Provide technical support for mainframe systems',
        'Monitor system performance and resolve issues',
        'Perform routine system maintenance',
        'Execute batch job processing',
        'Manage and optimize database operations',
        'Ensure system reliability and availability'
      ]
    },
    {
      positionId: 'Mainframe Support Engineer - 3 - Offshore',
      positionName: 'Mainframe Support Engineer',
      reportsTo: 'Mainframe Lead - Offshore',
      skillSet: [
        'COBOL Programming',
        'Mainframe Systems',
        'IBM z/OS',
        'JCL (Job Control Language)',
        'DB2 Database',
        'Batch Processing',
        'Troubleshooting',
        'Systems Monitoring',
        'Kafka'
      ],
      division: 'Transportation Field & Train Management',
      location: 'Offshore',
      role: 'Mainframe Support Technician',
      responsibilities: [
        'Provide technical support for mainframe systems',
        'Monitor system performance and resolve issues',
        'Perform routine system maintenance',
        'Execute batch job processing',
        'Manage and optimize database operations',
        'Ensure system reliability and availability'
      ]
    },
    {
      positionId: 'Mainframe Support Engineer - 4 - Offshore',
      positionName: 'Mainframe Support Engineer',
      reportsTo: 'Mainframe Lead - Offshore',
      skillSet: [
        'COBOL Programming',
        'Mainframe Systems',
        'IBM z/OS',
        'JCL (Job Control Language)',
        'DB2 Database',
        'Batch Processing',
        'Troubleshooting',
        'Systems Monitoring',
        'Kafka'
      ],
      division: 'Transportation Field & Train Management',
      location: 'Offshore',
      role: 'Mainframe Support Technician',
      responsibilities: [
        'Provide technical support for mainframe systems',
        'Monitor system performance and resolve issues',
        'Perform routine system maintenance',
        'Execute batch job processing',
        'Manage and optimize database operations',
        'Ensure system reliability and availability'
      ]
    },
    {
      positionId: 'Mainframe Support Engineer - 5 - Offshore',
      positionName: 'Mainframe Support Engineer',
      reportsTo: 'Mainframe Lead - Offshore',
      skillSet: [
        'COBOL Programming',
        'Mainframe Systems',
        'IBM z/OS',
        'JCL (Job Control Language)',
        'DB2 Database',
        'Batch Processing',
        'Troubleshooting',
        'Systems Monitoring',
        'Kafka'
      ],
      division: 'Transportation Field & Train Management',
      location: 'Offshore',
      role: 'Mainframe Support Technician',
      responsibilities: [
        'Provide technical support for mainframe systems',
        'Monitor system performance and resolve issues',
        'Perform routine system maintenance',
        'Execute batch job processing',
        'Manage and optimize database operations',
        'Ensure system reliability and availability'
      ]
    },
    {
      positionId: 'Mainframe Support Engineer - 6 - Offshore',
      positionName: 'Mainframe Support Engineer',
      reportsTo: 'Mainframe Lead - Offshore',
      skillSet: [
        'COBOL Programming',
        'Mainframe Systems',
        'IBM z/OS',
        'JCL (Job Control Language)',
        'DB2 Database',
        'Batch Processing',
        'Troubleshooting',
        'Systems Monitoring',
        'Kafka'
      ],
      division: 'Transportation Field & Train Management',
      location: 'Offshore',
      role: 'Mainframe Support Technician',
      responsibilities: [
        'Provide technical support for mainframe systems',
        'Monitor system performance and resolve issues',
        'Perform routine system maintenance',
        'Execute batch job processing',
        'Manage and optimize database operations',
        'Ensure system reliability and availability'
      ]
    },
    {
      positionId: 'Mainframe Support Engineer - 7 - Offshore',
      positionName: 'Mainframe Support Engineer',
      reportsTo: 'Mainframe Lead - Offshore',
      skillSet: [
        'COBOL Programming',
        'Mainframe Systems',
        'IBM z/OS',
        'JCL (Job Control Language)',
        'DB2 Database',
        'Batch Processing',
        'Troubleshooting',
        'Systems Monitoring',
        'Kafka'
      ],
      division: 'Transportation Field & Train Management',
      location: 'Offshore',
      role: 'Mainframe Support Technician',
      responsibilities: [
        'Provide technical support for mainframe systems',
        'Monitor system performance and resolve issues',
        'Perform routine system maintenance',
        'Execute batch job processing',
        'Manage and optimize database operations',
        'Ensure system reliability and availability'
      ]
    },
    {
      positionId: 'Mainframe Support Engineer - 8 - Offshore',
      positionName: 'Mainframe Support Engineer',
      reportsTo: 'Mainframe Lead - Offshore',
      skillSet: [
        'COBOL Programming',
        'Mainframe Systems',
        'IBM z/OS',
        'JCL (Job Control Language)',
        'DB2 Database',
        'Batch Processing',
        'Troubleshooting',
        'Systems Monitoring',
        'Kafka'
      ],
      division: 'Transportation Field & Train Management',
      location: 'Offshore',
      role: 'Mainframe Support Technician',
      responsibilities: [
        'Provide technical support for mainframe systems',
        'Monitor system performance and resolve issues',
        'Perform routine system maintenance',
        'Execute batch job processing',
        'Manage and optimize database operations',
        'Ensure system reliability and availability'
      ]
    },
    {
      positionId: 'Mainframe Support Engineer - 9 - Offshore',
      positionName: 'Mainframe Support Engineer',
      reportsTo: 'Mainframe Lead - Offshore',
      skillSet: [
        'COBOL Programming',
        'Mainframe Systems',
        'IBM z/OS',
        'JCL (Job Control Language)',
        'DB2 Database',
        'Batch Processing',
        'Troubleshooting',
        'Systems Monitoring',
        'Kafka'
      ],
      division: 'Transportation Field & Train Management',
      location: 'Offshore',
      role: 'Mainframe Support Technician',
      responsibilities: [
        'Provide technical support for mainframe systems',
        'Monitor system performance and resolve issues',
        'Perform routine system maintenance',
        'Execute batch job processing',
        'Manage and optimize database operations',
        'Ensure system reliability and availability'
      ]
    },
    {
      positionId: 'Mainframe Support Engineer - 10 - Offshore',
      positionName: 'Mainframe Support Engineer',
      reportsTo: 'Mainframe Lead - Offshore',
      skillSet: [
        'COBOL Programming',
        'Mainframe Systems',
        'IBM z/OS',
        'JCL (Job Control Language)',
        'DB2 Database',
        'Batch Processing',
        'Troubleshooting',
        'Systems Monitoring',
        'Kafka'
      ],
      division: 'Transportation Field & Train Management',
      location: 'Offshore',
      role: 'Mainframe Support Technician',
      responsibilities: [
        'Provide technical support for mainframe systems',
        'Monitor system performance and resolve issues',
        'Perform routine system maintenance',
        'Execute batch job processing',
        'Manage and optimize database operations',
        'Ensure system reliability and availability'
      ]
    },
  ]

  data: TreeNode[] = [
    {
      label: 'President',
      data: {
        positionName: 'President'
      },
      children: [],
      expanded: true,
      styleClass:  'onsite-location'
    }
  ];

  selectedNodes!: TreeNode[];


  ngOnInit() {
    this.positions.forEach(position => {
      const isPositionFilled = this.placePosition(position, this.data)
      if (!isPositionFilled) {
        this.data.push({
          label: position.positionId,
          data: position,
          expanded: true,
          children: [],
          styleClass: position.location === 'Onsite' ? 'onsite-location' : 'offshore-location'
        })
      }
    })

  }

  placePosition(position: any, nodes: TreeNode[]): boolean {
    for (let node of nodes) {
      if (node.label === position.reportsTo) {
        node.children.push({
          label: position.positionId,
          data: position,
          children: [],
          expanded: true,
          styleClass: position.location === 'Onsite' ? 'onsite-location' : 'offshore-location'
        })
        return true;
      }

      const isPositionFilled = this.placePosition(position, node.children)
      if (isPositionFilled) {
        return true
      }
    }
    return false;
  }

}
