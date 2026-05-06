# Mobile Application — Healthcare Asset Management Platform

The mobile application provides field technicians and clinical engineers with on-the-go access to asset information, work orders, and barcode/QR code scanning for asset identification.

## Technology Stack

| Technology | Purpose |
|---|---|
| Flutter 3 | Cross-platform mobile framework (iOS & Android) |
| Dart | Programming language |
| Riverpod | State management |
| Dio | HTTP client |
| flutter_barcode_scanner | QR/barcode scanning for asset tags |
| flutter_secure_storage | Secure token storage |

## Key Screens

| Screen | Description |
|---|---|
| Home | Dashboard with pending work orders and alerts |
| Asset Scanner | QR/barcode scan to instantly pull up an asset |
| Asset Detail | Full asset profile with maintenance history |
| Work Orders | View and update assigned work orders |
| Compliance | Record inspection results and upload certificates |

## Running Locally

```bash
flutter pub get
flutter run
```

## Building for Production

```bash
# Android
flutter build apk --release

# iOS
flutter build ios --release
```
