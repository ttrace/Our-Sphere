// Client side storage handler
// objects are saved onto localstorage with JSON text.

function init_localstorage()
{
	window.onbeforeunload = function ()
	{
		return save_storage_Changes( save_objects );
	};
  console.log('localstorage setup');
}

function clearAll()
{
  localStorage.clear();
}

function get_storage_Value( key )
{
  var value = localStorage.getItem( key );
  return( value );
}

function save_storage_Changes( item_list )
{
  console.log('saving', item_list);
  for ( i = 0; i < item_list.length ; i++ ) {
    localStorage.setItem( 'mynote_' + item_list[i].key, item_list[i].value );
  }
	return null;
}

function clearValue(value)
{
	if (value == 'myfield1')
	{
		sessionStorage.removeItem(value);
	}
	else
	{
		localStorage.removeItem(value);
	}
	document.getElementById(value).value = '';
}
