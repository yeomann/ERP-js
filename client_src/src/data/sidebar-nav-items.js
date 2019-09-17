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
      to: "/orders-invoices"
    },
    {
      title: "Sipariş yarat",
      htmlBefore: '<i class="material-icons">playlist_add</i>',
      to: "/add-order"
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
      title: "Supplier Lists",
      htmlBefore: '<i class="material-icons">list_alt</i>',
      to: "/supplier-list"
    },
    {
      title: "Customer with Debits (Veresiye)",
      htmlBefore: '<i class="material-icons">account_balance_wallet</i>',
      to: "/customer-with-debits-veresiye"
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
      title: "HR System",
      htmlBefore: '<i class="material-icons">emoji_people</i>',
      to: "/HR-system"
    },
    {
      title: "Forms & Components",
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: "/components-overview"
    },
    {
      title: "Admin Profile",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/user-profile-erp"
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
