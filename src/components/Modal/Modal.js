import "./Modal.css";


export default function Modal({show, content, handleClose}){

    const showHideClass = show ? "modal display-block" : "modal display-none";

    const handleClick = () => {
        content.approveFunction();
        handleClose();
    };

    return (
        <div className={showHideClass}>
            <section className="modal-main">
                <section className="modal-title">
                    {content.title}
                </section>
                <section className="modal-content">
                    {content.main}
                </section>
                <section className="modal-control">
                    <button onClick={handleClick}>Continue</button>
                    <button onClick={handleClose} className="button-warning">Cancel</button>
                </section>
            </section>
           
        </div>
    )
}