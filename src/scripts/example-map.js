var mappedNames = ['adam bergen', 'john ludena', 'travis hubbard'].map(function(nameStr){
	var nameObj = {
		first:  nameStr.split(' ')[0],
		last: nameStr.split(' ')[1]
	}

	return nameObj

})

// mappedNames ==>
//     [
//        {first: "adam", last: "bergen" },
//         