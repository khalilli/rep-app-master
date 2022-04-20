import './UsersFilter.css';
const UsersFilter = (props) => {
    const dropdownchange = (event) => {
        props.onChangefilter(event.target.value);
    };

    const userids = [];
    const usernames = [];
    for(var i=0; i<props.items.length; i++){
        userids.push(props.items[i].userid);
        usernames.push(props.items[i].username);
    }
    const uniqueUserids = [...new Set(userids)];
    const uniqueUsernames = [...new Set(usernames)];
    const useroptions = [<option value='0'>All Users</option>];
    console.log("Unique", uniqueUserids);
    for(var i=0;i<uniqueUserids.length;i++){
      useroptions.push(<option value={uniqueUserids[i]}>{uniqueUsernames[i]}</option>)
    }
    console.log("Useropt", useroptions);
    return (
      <div className="expenses-filter">
        <div className="expenses-filter__control">
          <label>Choose a user:</label>
          <select value={props.selected} onChange={dropdownchange}>
              {/* <option value='0'>All Users</option> */}
            {/* {uniqueUserids.map((item) => (
              <option value={item}>{item}</option>
            ))} */}
            {useroptions}
          </select>
        </div>
      </div>
    );
};

export default UsersFilter;