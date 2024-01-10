export default function Footer() {
    return(
        <>
            <footer className="content-footer footer bg-footer-theme">
              <div className="container-xxl">
                <div
                  className="footer-container d-flex align-items-center justify-content-between py-3 flex-md-row flex-column">
                  <div>Diseñado por <a href="https://manejoweb.com.ar" target="_blank">ManejoWeb</a></div>
                  <div className="d-none d-lg-inline-block">
                    <a
                      href="https://demos.pixinvent.com/materialize-html-admin-template/documentation/"
                      target="_blank"
                      className="footer-link me-4"
                      >Documentation</a
                    >
                  </div>
                </div>
              </div>
            </footer>

            <div className="content-backdrop fade"></div>
        </>
    )
}