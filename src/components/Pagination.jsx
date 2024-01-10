export default function Pagination(links,firstPage,lastPage,nextPage,prevPage) {
    return(
        <div class="float-end mt-4">
            { links && (
            <nav aria-label="Page navigation">
                <ul className="pagination pagination-rounded pagination-outline-primary">
                    { firstPage && (
                        <li className="page-item first">
                            <a className="page-link" href={firstPage}>
                                <i className="tf-icon mdi mdi-chevron-double-left"></i>
                            </a>
                        </li>
                    )}
                    { prevPage && (
                        <li className="page-item prev">
                            <a className="page-link" href={prevPage}>
                                Anterior
                            </a>
                        </li>
                    )}
                    { links.map( (link,index) => {
                            return(
                                <li key={index} className={`page-item d-none-sm ${link.active ? 'active' : ''}`} >
                                    <a className="page-link" href={link.url}>{link.label}</a>
                                </li>
                            )
                        })
                    }
                    { nextPage && (
                        <li className="page-item next">
                            <a className="page-link" href={nextPage}>
                                Siguiente
                            </a>
                        </li>
                    )}
                    { lastPage && (
                        <li className="page-item last">
                            <a className="page-link" href={lastPage}>
                                <i className="tf-icon mdi mdi-chevron-double-right"></i>
                            </a>
                        </li>
                    )}
                </ul>
            </nav>
            )}
        </div>
    )
}