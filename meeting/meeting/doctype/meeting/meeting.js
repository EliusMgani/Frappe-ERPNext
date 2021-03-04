// Copyright (c) 2021, frappe and contributors
// For license information, please see license.txt

frappe.ui.form.on("Meeting", {
	send_emails: function(frm) {
		if (frm.doc.status === "Planned") {
			frappe.call({
				method: "meeting.meeting.api.send_invitation_emails",
				args: {
					meeting: frm.doc.name
				}
			});
		}
	},
});



frappe.ui.form.on("Meeting Attendee", {
	attendee: function(frm, cdt, cdn){
		var attendee = frappe.model.get_doc(cdt, cdn);
		if (attendee.attendee){
			// if attendee, get full name
			frappe.call({
				method: "meeting.meeting.doctype.meeting.meeting.get_full_name",
				args: {
					attendee: attendee.ettendee
				},
				callback: function(r) {
					frappe.model.set_value(cdt, cdn, full_name, r.message);
				}
			});
		} else {
			// if no attendee, clear full name
			frappe.model.set_value(cdt, cdn, "full_name", null);
		}
	}
});
/*
frappe.ui.form.on("Meeeting Attendee", {
	attendee: function(frm, cdt, cdn){
		var attendee = frappe.model.get_doc(cdt, cdn);
		if (attendee.attendee){
			// if attendee, get full name
			frm.call({
				method: "meetnig.meeting.doctype.meeting.meeting.get_full_name"
				args: {
					attendee: attendee.ettendee
				},
				callback: function(r) {
					frappe.model.set_value(cdt, cdn, full_name, r.message):
				}
			});
		} else {
			// if no attendee, clear full name
			frappe.model.set_value(cdt, cdn, "full_name", null);
		}
	}
})
*/