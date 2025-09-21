
export default function DropdownMenu ({setModalType, closeMenu}) {
    return (
        <div className={"DropdownMenu_wrapper"}>
            <ul>
                <li onClick={() => {
                    setModalType(1);
                    closeMenu();
                }}>archive</li>
                <li onClick={() => {
                    setModalType(2);
                    closeMenu();
                }}>photo</li>
                <li onClick={() => {
                    setModalType(3);
                    closeMenu();
                }}>setting</li>
            </ul>
        </div>
    );
}