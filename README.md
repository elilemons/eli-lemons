# Eli Lemons

This is the code for my personal website.

### In this Document:

- [Eli Lemons](#eli-lemons)
  - [In this Document:](#in-this-document)
  - [Testing Locally](#testing-locally)
  - [Deployment](#deployment)

## Testing Locally

If you are testing the gyroscope locally, you need to spoof a signed http site.

To do this, install mkcert:

```sh
brew install mkcert
```

Then, run the following:

```sh
mkcert localhost
```

This will create a cert.pem and key.pem file. These are already in the .gitignore file, so you don't need to add them to the repo.

Then, run the following:

```sh
local-ssl-proxy --source 3010 --target 3000 --cert localhost.pem --key localhost-key.pem
```

In a seperate terminal, run the project:

```sh
pnpm dev
```

When you go to https://localhost:3010/ it may warn the site isn't secure. Depending on your browser, you may need to click "Advanced" and then "Proceed to localhost (unsafe)".

To do so on your phone, find the IP address of your computer and go to dress of your computer and go to https://URL_ADDRESS_ADDRESS>:3010/.

## Deployment

Before deploying, consider syncing the local database with the deployed db.
