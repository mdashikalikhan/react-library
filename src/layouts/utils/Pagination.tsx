export const Pagination: React.FC<{
    currentPage: number,
    totalPage: number, paginate: any
}> = (props) => {

    const pageNumbers = [];

    if(props.currentPage-2>=1){
        pageNumbers.push(props.currentPage-2);
    }

    if(props.currentPage-1>=1){
        pageNumbers.push(props.currentPage-1);
    }

    pageNumbers.push(props.currentPage);
    
    if(props.currentPage+1<=props.totalPage){
        pageNumbers.push(props.currentPage+1);
    }

    if(props.currentPage+2<=props.totalPage){
        pageNumbers.push(props.currentPage+2);
    }
    

    return (
        <nav aria-label="...">
            <ul className="pagination">
                <li className="page-item"
                    onClick={() => props.paginate(0)}>
                    <button className="page-link">
                        First Page
                    </button>
                </li>
                {
                    pageNumbers.map(n=>(
                        <li key={n}  onClick={()=>props.paginate(n-1)}
                            className={'page-item ' + (props.currentPage===n?'active':'')}>
                                <button className="page-link">
                                    {n}
                                </button>
                        </li>
                    ))
                }
                <li className="page-item"
                    onClick={() => props.paginate(props.totalPage-1)}>
                    <button className="page-link">
                        Last Page
                    </button>
                </li>
            </ul>

        </nav>
    );
}