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
                <option value='0'>Users</option>
                <option value='42'>42</option>
                {/* <option value='100991'>100991</option>
                <option value='18884'>18884</option>
                <option value='?'>?</option> */}
                <option value='19'>19</option>
                <option value='38'>38</option>
                </select>
            </div>
        </div>
    );
};

export default UsersFilter;