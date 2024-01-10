import Logout from './Logout'


export default function NavBar () {
    const Search = () => {
        return(
            <div className="navbar-nav align-items-center">
                <div className="nav-item navbar-search-wrapper mb-0">
                  <a className="nav-item nav-link search-toggler fw-normal px-0" href="#">
                    <i className="mdi mdi-magnify mdi-24px scaleX-n1-rtl"></i>
                    <span className="d-none d-md-inline-block text-muted">Search (Ctrl+/)</span>
                  </a>
                </div>
            </div>
        )
    }
    const Languajes = () => {
        return(
            <li className="nav-item dropdown-language dropdown me-1 me-xl-0">
                <a
                className="nav-link btn btn-text-secondary rounded-pill btn-icon dropdown-toggle hide-arrow"
                href="#"
                data-bs-toggle="dropdown">
                <i className="mdi mdi-translate mdi-24px"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                <li>
                    <a className="dropdown-item" href="#" data-language="en">
                    <span className="align-middle">English</span>
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#" data-language="fr">
                    <span className="align-middle">French</span>
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#" data-language="de">
                    <span className="align-middle">German</span>
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#" data-language="pt">
                    <span className="align-middle">Portuguese</span>
                    </a>
                </li>
                </ul>
            </li>
        )
    }
    const DarkLightMode = () =>{
        return(
            <li className="nav-item dropdown-style-switcher dropdown me-2 me-xl-0">
                <a
                    className="nav-link btn btn-text-secondary rounded-pill btn-icon dropdown-toggle hide-arrow"
                    href="#"
                    data-bs-toggle="dropdown"
                >
                <i className="mdi mdi-24px"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-styles">
                <li>
                    <a className="dropdown-item" href="#" data-theme="light">
                    <span className="align-middle"><i className="mdi mdi-weather-sunny me-2"></i>Light</span>
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#" data-theme="dark">
                    <span className="align-middle"><i className="mdi mdi-weather-night me-2"></i>Dark</span>
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#" data-theme="system">
                    <span className="align-middle"><i className="mdi mdi-monitor me-2"></i>System</span>
                    </a>
                </li>
                </ul>
                
            </li>
        )
    }
    const ShortCuts = () => {
        return(
            <li className="nav-item dropdown-shortcuts navbar-dropdown dropdown me-1 me-xl-0">
                <a
                className="nav-link btn btn-text-secondary rounded-pill btn-icon dropdown-toggle hide-arrow"
                href="#"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false">
                <i className="mdi mdi-view-grid-plus-outline mdi-24px"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-end py-0">
                <div className="dropdown-menu-header border-bottom">
                    <div className="dropdown-header d-flex align-items-center py-3">
                    <h5 className="text-body mb-0 me-auto">Shortcuts</h5>
                    <a
                        href="#"
                        className="dropdown-shortcuts-add text-muted"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Add shortcuts"
                        ><i className="mdi mdi-view-grid-plus-outline mdi-24px"></i
                    ></a>
                    </div>
                </div>
                <div className="dropdown-shortcuts-list scrollable-container">
                    <div className="row row-bordered overflow-visible g-0">
                    <div className="dropdown-shortcuts-item col">
                        <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                        <i className="mdi mdi-calendar fs-4"></i>
                        </span>
                        <a href="app-calendar.html" className="stretched-link">Calendar</a>
                        <small className="text-muted mb-0">Appointments</small>
                    </div>
                    <div className="dropdown-shortcuts-item col">
                        <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                        <i className="mdi mdi-file-document-outline fs-4"></i>
                        </span>
                        <a href="app-invoice-list.html" className="stretched-link">Invoice App</a>
                        <small className="text-muted mb-0">Manage Accounts</small>
                    </div>
                    </div>
                    <div className="row row-bordered overflow-visible g-0">
                    <div className="dropdown-shortcuts-item col">
                        <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                        <i className="mdi mdi-account-outline fs-4"></i>
                        </span>
                        <a href="app-user-list.html" className="stretched-link">User App</a>
                        <small className="text-muted mb-0">Manage Users</small>
                    </div>
                    <div className="dropdown-shortcuts-item col">
                        <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                        <i className="mdi mdi-shield-check-outline fs-4"></i>
                        </span>
                        <a href="app-access-roles.html" className="stretched-link">Role Management</a>
                        <small className="text-muted mb-0">Permission</small>
                    </div>
                    </div>
                    <div className="row row-bordered overflow-visible g-0">
                    <div className="dropdown-shortcuts-item col">
                        <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                        <i className="mdi mdi-chart-pie-outline fs-4"></i>
                        </span>
                        <a href="index.html" className="stretched-link">Dashboard</a>
                        <small className="text-muted mb-0">Analytics</small>
                    </div>
                    <div className="dropdown-shortcuts-item col">
                        <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                        <i className="mdi mdi-cog-outline fs-4"></i>
                        </span>
                        <a href="pages-account-settings-account.html" className="stretched-link">Setting</a>
                        <small className="text-muted mb-0">Account Settings</small>
                    </div>
                    </div>
                    <div className="row row-bordered overflow-visible g-0">
                    <div className="dropdown-shortcuts-item col">
                        <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                        <i className="mdi mdi-help-circle-outline fs-4"></i>
                        </span>
                        <a href="pages-faq.html" className="stretched-link">FAQs</a>
                        <small className="text-muted mb-0">FAQs & Articles</small>
                    </div>
                    <div className="dropdown-shortcuts-item col">
                        <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
                        <i className="mdi mdi-dock-window fs-4"></i>
                        </span>
                        <a href="modal-examples.html" className="stretched-link">Modals</a>
                        <small className="text-muted mb-0">Useful Popups</small>
                    </div>
                    </div>
                </div>
                </div>
            </li>
        )
    }
    const Notifications = () => {
        return(
            <li className="nav-item dropdown-notifications navbar-dropdown dropdown me-2 me-xl-1">
                <a
                className="nav-link btn btn-text-secondary rounded-pill btn-icon dropdown-toggle hide-arrow"
                href="#"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false">
                <i className="mdi mdi-bell-outline mdi-24px"></i>
                <span
                    className="position-absolute top-0 start-50 translate-middle-y badge badge-dot bg-danger mt-2 border"></span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end py-0">
                <li className="dropdown-menu-header border-bottom">
                    <div className="dropdown-header d-flex align-items-center py-3">
                    <h6 className="mb-0 me-auto">Notification</h6>
                    <span className="badge rounded-pill bg-label-primary">8 New</span>
                    </div>
                </li>
                <li className="dropdown-notifications-list scrollable-container">
                    <ul className="list-group list-group-flush">
                    
                    <li className="list-group-item list-group-item-action dropdown-notifications-item">
                        <div className="d-flex gap-2">
                        <div className="flex-shrink-0">
                            <div className="avatar me-1">
                            <img src="/assets/img/avatars/1.png" alt="avatar" className="w-px-40 h-auto rounded-circle" />
                            </div>
                        </div>
                        <div className="d-flex flex-column flex-grow-1 overflow-hidden w-px-200">
                            <h6 className="mb-1 text-truncate">Congratulation Lettie 🎉</h6>
                            <small className="text-truncate text-body">Won the monthly best seller gold badge</small>
                        </div>
                        <div className="flex-shrink-0 dropdown-notifications-actions">
                            <small className="text-muted">1h ago</small>
                        </div>
                        </div>
                    </li>
                    
                    </ul>
                </li>
                <li className="dropdown-menu-footer border-top p-2">
                    <a href="#" className="btn btn-primary d-flex justify-content-center">
                    View all notifications
                    </a>
                </li>
                </ul>
            </li>
        )
    }
    const MenuPerfil = () => {
        return(
            <li className="nav-item navbar-dropdown dropdown-user dropdown">
            <a className="nav-link dropdown-toggle hide-arrow" href="#" data-bs-toggle="dropdown">
              <div className="avatar avatar-online">
                <img src="/assets/img/avatars/1.png" alt="avatar6" className="w-px-40 h-auto rounded-circle" />
              </div>
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item" href="pages-account-settings-account.html">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar avatar-online">
                        <img src="/assets/img/avatars/1.png" alt="avatar7" className="w-px-40 h-auto rounded-circle" />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <span className="fw-medium d-block">John Doe</span>
                      <small className="text-muted">Admin</small>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <div className="dropdown-divider"></div>
              </li>
              <li>
                <a className="dropdown-item" href="pages-profile-user.html">
                  <i className="mdi mdi-account-outline me-2"></i>
                  <span className="align-middle">My Profile</span>
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="pages-account-settings-account.html">
                  <i className="mdi mdi-cog-outline me-2"></i>
                  <span className="align-middle">Settings</span>
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="pages-account-settings-billing.html">
                  <span className="d-flex align-items-center align-middle">
                    <i className="flex-shrink-0 mdi mdi-credit-card-outline me-2"></i>
                    <span className="flex-grow-1 align-middle">Billing</span>
                    <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">4</span>
                  </span>
                </a>
              </li>
              <li>
                <div className="dropdown-divider"></div>
              </li>
              <li>
                <a className="dropdown-item" href="pages-faq.html">
                  <i className="mdi mdi-help-circle-outline me-2"></i>
                  <span className="align-middle">FAQ</span>
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="pages-pricing.html">
                  <i className="mdi mdi-currency-usd me-2"></i>
                  <span className="align-middle">Pricing</span>
                </a>
              </li>
              <li>
                <div className="dropdown-divider"></div>
              </li>
              
              <Logout />
            </ul>
          </li>
        )
    }
    return (
        <nav
            className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
            id="layout-navbar"
        >
            <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
              <a className="nav-item nav-link px-0 me-xl-4" href="#">
                <i className="mdi mdi-menu mdi-24px"></i>
              </a>
            </div>

            <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
             
              <Search />

              <ul className="navbar-nav flex-row align-items-center ms-auto">
                
                <Languajes />
               
               
                <DarkLightMode />

                <ShortCuts />
                
                <Notifications />
                

               <MenuPerfil />
                
              </ul>
            </div>

            <div className="navbar-search-wrapper search-input-wrapper d-none">
              <input
                type="text"
                className="form-control search-input container-xxl border-0"
                placeholder="Search..."
                aria-label="Search..." />
              <i className="mdi mdi-close search-toggler cursor-pointer"></i>
            </div>
          </nav>
    )
}