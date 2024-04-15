terraform {
  required_providers {
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 4.0"
    }
  }
}

provider "google-beta" {
  user_project_override = true
}

resource "google_project" "default" {
  provider        = google-beta.no_user_project_override
  name            = "Project Display Name"
  project_id      = "project-id-for-new-project"
  billing_account = "000000-000000-000000"

  labels = {
    "firebase" = "enabled"
  }
}

resource "google_project_service" "default" {
  provider = google-beta.no_user_project_override
  project  = google_project.default.project_id
  for_each = toset([
    "cloudbilling.googleapis.com",
    "cloudresourcemanager.googleapis.com",
    "firebase.googleapis.com",
    "serviceusage.googleapis.com",
  ])
  service = each.key

  disable_on_destroy = false
}

resource "google_firebase_project" "default" {
  provider = google-beta
  project  = google_project.default.project_id
}

resource "google_firebase_android_app" "default" {
  provider     = google-beta
  project      = google_project.default.project_id
  display_name = "My Awesome Android app"
  package_name = "awesome.package.name"
}

