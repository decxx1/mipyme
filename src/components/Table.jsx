export default function Table ({children, thead}) {
    
    return(
        
        <div className="table-responsive text-nowrap">
            <table className="table table-striped table-bordered">
                <thead className="table-primary">
                    <tr>
                    {thead.map( (th,index) => {
                        return(
                            <th key={index}>{th}</th>
                        )
                    })}
                    </tr>
                </thead>
                <tbody className="table-border-bottom-0">
                    {children}
                </tbody>
            </table>
        </div>
            
    )
}