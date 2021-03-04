# -*- coding: utf-8 -*-
# Copyright (c) 2021, frappe and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.model.document import Document

class Meeting(Document):
	def validate(self):
		"""Set Missing Names and Warn if Duplicte"""
		found = []
		for attendee in self.attendees:
			if not attendee.full_name:
				attendee.full_name = get_full_name(attendee.attendee)
			
			if attendee.attendee in found:
				frappe.throw(_("Attendee {0} Entered Twice").format(attendee.attendee))
			
			found.append(attendee.attendee)

@frappe.whitelist()
def get_full_name(attendee):
	user = frappe.get_doc("User", attendee.attendee)
	# Concatenate by Spaces if it has Value
	return " ".join(filter(None, [user.first_name, user.middle_name, user.last_name]))
