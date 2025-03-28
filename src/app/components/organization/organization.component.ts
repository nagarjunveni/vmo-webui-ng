import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { OrganizationChartModule } from 'primeng/organizationchart';

@Component({
  selector: 'app-organization',
  standalone: true,
  imports: [
    OrganizationChartModule
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
      skillSet: [],
      division: '',
      location: 'Onsite',
      role: '',
      responsibilities: ''
    },
    {
      positionId: 'Chief Architect - 2',
      positionName: 'Chief Architect - 2',
      reportsTo: 'President',
      skillSet: [],
      division: '',
      location: 'Onsite',
      role: '',
      responsibilities: ''
    },
    {
      positionId: 'Java Lead - 1 - Onsite',
      positionName: 'Java Lead - Onsite',
      reportsTo: 'Chief Architect - 1',
      skillSet: [],
      division: 'Transportation Field & Train Management',
      location: 'Onsite',
      role: '',
      responsibilities: ''
    },
    {
      positionId: 'Java Support Engineer - Onsite',
      positionName: 'Java Support Engineer',
      reportsTo: 'Java Lead - 1 - Onsite',
      skillSet: [],
      division: 'Transportation Field & Train Management',
      location: 'Onsite',
      role: '',
      responsibilities: ''
    },
    {
      positionId: 'Java Lead - Offshore',
      positionName: 'Java Lead - 1',
      reportsTo: 'Chief Architect - 1',
      skillSet: [],
      division: 'Transportation Field & Train Management',
      location: 'Offshore',
      role: '',
      responsibilities: ''
    },
    {
      positionId: 'Java Support Engineer - 1 - Offshore',
      positionName: 'Java Support Engineer',
      reportsTo: 'Java Lead - Offshore',
      skillSet: [],
      division: 'Transportation Field & Train Management',
      location: 'Offshore',
      role: '',
      responsibilities: ''
    },
    {
      positionId: 'Java Support Engineer - 2 - Offshore',
      positionName: 'Java Support Engineer',
      reportsTo: 'Java Lead - Offshore',
      skillSet: [],
      division: 'Transportation Field & Train Management',
      location: '',
      role: '',
      responsibilities: ''
    },
    {
      positionId: 'Java Support Engineer - 3 - Offshore',
      positionName: 'Java Support Engineer',
      reportsTo: 'Java Lead - Offshore',
      skillSet: [],
      division: 'Transportation Field & Train Management',
      location: 'Offshore',
      role: '',
      responsibilities: ''
    },
    {
      positionId: 'Java Support Engineer - 4 - Offshore',
      positionName: 'Java Support Engineer',
      reportsTo: 'Java Lead - Offshore',
      skillSet: [],
      division: 'Transportation Field & Train Management',
      location: 'Offshore',
      role: '',
      responsibilities: ''
    },
    {
      positionId: 'Java Support Engineer - 5 - Offshore',
      positionName: 'Java Support Engineer',
      reportsTo: 'Java Lead - Offshore',
      skillSet: [],
      division: 'Transportation Field & Train Management',
      location: 'Offshore',
      role: '',
      responsibilities: ''
    },
    {
      positionId: 'Java Support Engineer - 6 - Offshore',
      positionName: 'Java Support Engineer',
      reportsTo: 'Java Lead - Offshore',
      skillSet: [],
      division: 'Transportation Field & Train Management',
      location: 'Offshore',
      role: '',
      responsibilities: ''
    },

    {
      positionId: 'Mainframe Lead - 1 - Onsite',
      positionName: 'Mainframe Lead - Onsite',
      reportsTo: 'Chief Architect - 1',
      skillSet: [],
      division: 'Transportation Field & Train Management',
      location: 'Onsite',
      role: '',
      responsibilities: ''
    },
    {
      positionId: 'Mainframe Support Engineer - Onsite',
      positionName: 'Mainframe Support Engineer',
      reportsTo: 'Mainframe Lead - 1 - Onsite',
      skillSet: [],
      division: 'Transportation Field & Train Management',
      location: 'Onsite',
      role: '',
      responsibilities: ''
    },
    {
      positionId: 'Mainframe Lead - Offshore',
      positionName: 'Mainframe Lead - 1',
      reportsTo: 'Chief Architect - 1',
      skillSet: [],
      division: 'Transportation Field & Train Management',
      location: 'Offshore',
      role: '',
      responsibilities: ''
    },
    {
      positionId: 'Mainframe Support Engineer - 1 - Offshore',
      positionName: 'Mainframe Support Engineer',
      reportsTo: 'Mainframe Lead - Offshore',
      skillSet: [],
      division: 'Transportation Field & Train Management',
      location: 'Offshore',
      role: '',
      responsibilities: ''
    },
    {
      positionId: 'Mainframe Support Engineer - 2 - Offshore',
      positionName: 'Mainframe Support Engineer',
      reportsTo: 'Mainframe Lead - Offshore',
      skillSet: [],
      division: 'Transportation Field & Train Management',
      location: 'Offshore',
      role: '',
      responsibilities: ''
    },
    {
      positionId: 'Mainframe Support Engineer - 3 - Offshore',
      positionName: 'Mainframe Support Engineer',
      reportsTo: 'Mainframe Lead - Offshore',
      skillSet: [],
      division: 'Transportation Field & Train Management',
      location: 'Offshore',
      role: '',
      responsibilities: ''
    },
    {
      positionId: 'Mainframe Support Engineer - 4 - Offshore',
      positionName: 'Mainframe Support Engineer',
      reportsTo: 'Mainframe Lead - Offshore',
      skillSet: [],
      division: 'Transportation Field & Train Management',
      location: 'Offshore',
      role: '',
      responsibilities: ''
    },
    {
      positionId: 'Mainframe Support Engineer - 5 - Offshore',
      positionName: 'Mainframe Support Engineer',
      reportsTo: 'Mainframe Lead - Offshore',
      skillSet: [],
      division: 'Transportation Field & Train Management',
      location: 'Offshore',
      role: '',
      responsibilities: ''
    },
    {
      positionId: 'Mainframe Support Engineer - 6 - Offshore',
      positionName: 'Mainframe Support Engineer',
      reportsTo: 'Mainframe Lead - Offshore',
      skillSet: [],
      division: 'Transportation Field & Train Management',
      location: 'Offshore',
      role: '',
      responsibilities: ''
    },
    {
      positionId: 'Mainframe Support Engineer - 7 - Offshore',
      positionName: 'Mainframe Support Engineer',
      reportsTo: 'Mainframe Lead - Offshore',
      skillSet: [],
      division: 'Transportation Field & Train Management',
      location: 'Offshore',
      role: '',
      responsibilities: ''
    },
    {
      positionId: 'Mainframe Support Engineer - 8 - Offshore',
      positionName: 'Mainframe Support Engineer',
      reportsTo: 'Mainframe Lead - Offshore',
      skillSet: [],
      division: 'Transportation Field & Train Management',
      location: 'Offshore',
      role: '',
      responsibilities: ''
    },
    {
      positionId: 'Mainframe Support Engineer - 9 - Offshore',
      positionName: 'Mainframe Support Engineer',
      reportsTo: 'Mainframe Lead - Offshore',
      skillSet: [],
      division: 'Transportation Field & Train Management',
      location: 'Offshore',
      role: '',
      responsibilities: ''
    },
    {
      positionId: 'Mainframe Support Engineer - 10 - Offshore',
      positionName: 'Mainframe Support Engineer',
      reportsTo: 'Mainframe Lead - Offshore',
      skillSet: [],
      division: 'Transportation Field & Train Management',
      location: 'Offshore',
      role: '',
      responsibilities: ''
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
