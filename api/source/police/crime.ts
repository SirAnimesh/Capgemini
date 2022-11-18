export interface Crime {
  category: string
  context: string
  id: string
  location_subtype: string
  location_type: "Force" | "BTP: Force"
  location: Location
  month: string
  outcome_status: OutcomeStatus
  persistent_id: string
}

export interface Location {
  latitude: string
  longitude: string
  street: {
    id: number
    name: string
  }
}

export interface OutcomeStatus {
  category: OutcomeCategory
  date: string
}

export enum OutcomeCategory {
  absolute_discharge = "Offender given absolute discharge",
  action_taken_by_another_organisation = "Action to be taken by another organisation",
  awaiting_court_result = "Awaiting court outcome",
  cautioned = "Offender given a caution",
  charged = "Suspect charged",
  community_penalty = "Offender given community sentence",
  compensation = "Offender ordered to pay compensation",
  conditional_discharge = "Offender given conditional discharge",
  court_result_unavailable = "Court result unavailable",
  deprived_of_property = "Offender deprived of property",
  drugs_possession_warning = "Offender given a drugs possession warning",
  fined = "Offender fined",
  formal_action_not_in_public_interest = "Formal action is not in the public interest",
  further_action_not_in_public_interest = "Further action is not in the public interest",
  further_investigation_not_in_public_interest = "Further investigation is not in the public interest",
  imprisoned = "Offender sent to prison",
  local_resolution = "Local resolution",
  no_further_action = "Investigation complete; no suspect identified",
  not_guilty = "Defendant found not guilty",
  other_court_disposal = "Offender otherwise dealt with",
  penalty_notice_issued = "Offender given a penalty notice",
  sent_to_crown_court = "Defendant sent to Crown Court",
  sentenced_in_another_case = "Suspect charged as part of another case",
  status_update_unavailable = "Status update unavailable",
  suspended_sentence = "Offender given suspended prison sentence",
  unable_to_proceed = "Court case unable to proceed",
  unable_to_prosecute = "Unable to prosecute suspect",
  under_investigation = "Under investigation"
}