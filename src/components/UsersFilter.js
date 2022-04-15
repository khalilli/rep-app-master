import './UsersFilter.css';
const UsersFilter = (props) => {
    const dropdownchange = (event) => {
        props.onChangefilter(event.target.value);
    };
    return(
        <div className="expenses-filter">
            <div className="expenses-filter__control">
                <label>Choose a user:</label>
                <select value={props.selected} onChange={dropdownchange}>
                <option value='0'>All</option>
                <option value='100991'>100991</option>
                <option value='18884'>18884</option>
                <option value='?'>?</option>
                </select>
            </div>
        </div>
    );
};

export default UsersFilter;