import './UsersFilter.css';
const UsersFilter = (props) => {
    const dropdownchange = (event) => {
        props.onChangefilter(event.target.value);
    };

    const userids = [];
    for(var i=0; i<props.items.length; i++){
        userids.push(props.items[i].userid);
    }
    const uniqueUserids = [...new Set(userids)];
    console.log("Unique", uniqueUserids);
    return (
      <div className="expenses-filter">
        <div className="expenses-filter__control">
          <label>Choose a user:</label>
          <select value={props.selected} onChange={dropdownchange}>
              <option value='0'>All Users</option>
            {/* <option value='0'>Users</option>
            <option value='100991'>100991</option>
            <option value='18884'>18884</option>
            <option value='?'>?</option> */}
            {uniqueUserids.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>
    );
};

export default UsersFilter;