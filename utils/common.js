export const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


export const getRoomId = (userId1, userId2) => {
    const sortedIds = [userId1, userId2].sort();
    const roomId = sortedIds.join('_');
    return roomId;
}

export const formattedDate = date=> {
    const now = new Date();
  
    if (date.toDateString() === now.toDateString()) {
      // Format time only (12-hour format)
      let hours = date.getHours();
      let minutes = date.getMinutes();
      const period = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      if (hours === 0) hours = 12;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      return `${hours}:${minutes} ${period}`;
    }

    var day = date.getDate();
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Set", "Oct", "Nov", "Dec"];
    var month = monthNames[date.getMonth()];

    const yesterday = new Date();
    yesterday.setDate(date.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }

    var newDate = day +' ' + month;
    return newDate;
}

export const renderTime = (input) => {
    console.log("renderTime raw input:", input);
  
    let date;
    if (!input) {
      return "No Date Provided";
    }
    if (input instanceof Date) {
      date = input;
    } else if (input && typeof input.toDate === 'function') {
      date = input.toDate();
    } else {
      date = new Date(input);
    }
    
    if (isNaN(date.getTime())) {
      console.log("Invalid date generated:", date);
      return "Invalid Date";
    }
  
    const now = new Date();
  
    if (date.toDateString() === now.toDateString()) {
      // Format time only (12-hour format)
      let hours = date.getHours();
      let minutes = date.getMinutes();
      const period = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      if (hours === 0) hours = 12;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      return `${hours}:${minutes} ${period}`;
    }
  
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
  
    return formattedDate(date);
  };