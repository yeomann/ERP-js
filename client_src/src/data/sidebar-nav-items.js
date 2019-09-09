export default function() {
  return [
    {
      title: "Api Dashboard",
      to: "/erp-dashboard",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "Sipariş ve Faturalar",
      htmlBefore: '<i class="material-icons">shopping_cart</i>',
      to: "/getAllOrders"
    },
    {
      title: "Sipariş yarat",
      htmlBefore: '<i class="material-icons">playlist_add</i>',
      to: "/create-order"
    },
    {
      title: "Customers",
      htmlBefore: '<i class="material-icons">accessibility_new</i>',
      to: "/customers"
    },
    {
      title: "Customer Contact List",
      htmlBefore: '<i class="material-icons">contact_phone</i>',
      to: "/customer-contact-list"
    },
    {
      title: "Stocks",
      htmlBefore: '<i class="material-icons">category</i>',
      to: "/stocks"
    },
    {
      title: "Add New Stock",
      htmlBefore: '<i class="material-icons">playlist_add</i>',
      to: "/add-stock"
    },
    {
      title: "Forms & Components",
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: "/components-overview"
    },
    {
      title: "Admin Profile",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/user-profile-foodish"
    }
    // {
    //   title: "Tables",
    //   htmlBefore: '<i class="material-icons">table_chart</i>',
    //   to: "/tables",
    // },
    // {
    //   title: "Errors",
    //   htmlBefore: '<i class="material-icons">error</i>',
    //   to: "/errors",
    // }
  ];
}
