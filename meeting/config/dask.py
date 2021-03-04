
from frappe import _

def get_data():
    return [
		{
			"label": _("Tools"),
			"icon": "octicon octicon-briefcase",
			"items": [
				{
					"type": "doctype",
					"name": "Meeting",
					"label": _("Meeting"),
					"description": _("Prepare Propaganda, Invite Users and Recording Minutes"),
					
				}
        }
            ]