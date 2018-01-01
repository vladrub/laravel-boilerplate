export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'users',
        data: {
          menu: {
            title: 'Пользователи',
            icon: 'ion-person',
            pathMatch: 'prefix',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'photo-contest',
        data: {
          menu: {
            title: 'Фото конкурс',
            icon: 'ion-person',
            pathMatch: 'prefix',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'schedule',
        data: {
          menu: {
            title: 'Телепрограмма',
            icon: 'ion-ios-list-outline',
            pathMatch: 'prefix',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
          path: 'messages',
          data: {
              menu: {
                  title: 'Чат',
                  icon: 'ion-chatbubbles',
                  pathMatch: 'prefix',
                  selected: false,
                  expanded: false,
                  order: 0
              }
          },
          children: [
              {
                  path: 'list',
                  data: {
                      menu: {
                          title: 'Не отвеченые',
                          icon: 'ion-chatbubbles',
                          pathMatch: 'prefix',
                          selected: false,
                          expanded: false,
                          order: 0
                      }
                  }
              },
              {
                  path: 'answered',
                  data: {
                      menu: {
                          title: 'Отвеченые',
                          icon: 'ion-chatbubbles',
                          pathMatch: 'prefix',
                          selected: false,
                          expanded: false,
                          order: 0
                      }
                  }
              }
          ]
      }
    ]
  }
];
