import React from 'react';

const LinksRoutes = {};

const setLinks = () => {
   LinksRoutes.mainLinksRoutes = [
    {
      path: "/",
      component: React.components.Home,
      name: "",
      exact: true,
      show: false
    },
    {
      path: "/main",
      component: React.components.CardsGrid,
      name: "Todos"
    },
    {
      path: "/sale",
      component: React.components.CardsGrid,
      name: "Ventas"
    },
    {
      path: "/rent",
      component: React.components.CardsGrid,
      name: "Alquileres"
    },
    ,
    {
      path: "/new",
      component: React.components.CardDetails,
      name: "Nuevo"
    },
    {
      path: "/view",
      component: React.components.CardDetails,
      name: "",
      show: false
    },
    {
      path: "/users",
      component: React.components.UserSection,
      name: "Usuarios"
    }
  ];

  return LinksRoutes;
}

export default setLinks;


/*const functionName = props => {  

  LinksRoutes.mainLinksRoutes = [
    {
      path: "/",
      component: React.components.Home,
      name: "",
      exact: true,
      show: false
    },
    {
      path: "/main",
      component: React.components.CardsGrid,
      name: "Todos"
    },
    {
      path: "/sale",
      component: React.components.PostsGrid,
      name: "Ventas"
    },
    {
      path: "/rent",
      component: React.components.PostsGrid,
      name: "Alquileres"
    },
    ,
    {
      path: "/new",
      component: React.components.PostDetails,
      name: "Nuevo"
    },
    {
      path: "/view",
      component: React.components.PostDetails,
      name: "",
      show: false
    },
    {
      path: "/test",
      component: React.components.Test,
      name: "",
    }
  ];

  return (
    <div>
      <h1>title</h1>
    </div>
  );
}*/


// setTimeout(function () {
//   console.log("Routes");
//   LinksRoutes.mainLinksRoutes = [
//     {
//       path: "/",
//       component: React.components.Home,
//       name: "",
//       exact: true,
//       show: false
//     },
//     {
//       path: "/main",
//       component: React.components.PostsGrid,
//       name: "Todos"
//     },
//     {
//       path: "/sale",
//       component: React.components.PostsGrid,
//       name: "Ventas"
//     },
//     {
//       path: "/rent",
//       component: React.components.PostsGrid,
//       name: "Alquileres"
//     },
//     ,
//     {
//       path: "/new",
//       component: React.components.PostDetails,
//       name: "Nuevo"
//     },
//     {
//       path: "/view",
//       component: React.components.PostDetails,
//       name: "",
//       show: false
//     },
//     {
//       path: "/test",
//       component: React.components.Test,
//       name: "",
//     }
//   ];
// }, 0);


// const tabLinksRoutes = [
//   // {
//   //   path: "/owner/PhotoGrid",
//   //   component: PhotoGrid,
//   //   name: "PhotoGrid",
//   //   title:"PhotoGrid"
//   // },
//   {
//     path: "/owner/Tab",
//     component: Tab,
//     name: "Tab",
//     title:"Titulo"
//   },
//   {
//     path: "/owner/Tab",
//     component: Tab,
//     name: "Tab",
//     title:"Titulo"
//   }
// ];



