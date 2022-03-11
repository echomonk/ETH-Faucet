

// 0xf86c01850c4b201000825208949cbfd6ebdb9cfcccd6b043f43e524583486d455e880490283b23ec8f768025a067da959a6d114d42016b5fb43ff8ae018efe6e4c784d40dfb2f2aad8fb2d4f6ca00b019b1e457b592e5bfd553e3b73742de625c7b65145494a57dbca17e5e9d842


// TXN HASH BREAKDOWN
// 0x

// 01101100
// f8 = f7 + length of payload in binary form in bytes
// 6c = 108 bytes is payload
// 01 = nonce

// 85 means 0x85 - 0x80 (hex to decimal)
// 133 - 128 = 5 bytes

// 85 0c4b201000 - gasPrice

// 82 means 0x82 = 0x80 = 2 bytes
// 82 5208 gasLimit

// 94 means 0x94 - 0x80 = 20 bytes
// 94 9cbfd6ebdb9cfcccd6b043f43e524583486d455e - to

// 88 means 0x82 - 0x80 = 8 bytes
// 88 0490283b23ec8f76

// 80 - data

// v r s values
// txn hash it is seperated by "a0". breakdown below.

// 0x25 - 1 byte encoding itself
// 25 = v

// a0 means a0 - 0x80 = 160 - 128 = 32 bytes
// a0 67da959a6d114d42016b5fb43ff8ae018efe6e4c784d40dfb2f2aad8fb2d4f6c = r

// a0 means a0 - 0x80 = 160 - 128 = 32 bytes
// a0 0b019b1e457b592e5bfd553e3b73742de625c7b65145494a57dbca17e5e9d842 = s

const EthereumTx = require("ethereumjs-tx").Transaction

const txParams = {

    nonce: "0x01",
    gasPrice: "0x0c4b201000",
    gasLimit: "0x5208",
    to: "0x9cbfd6ebdb9cfcccd6b043f43e524583486d455e",
    value: "0x0490283b23ec8f76",
    data: "0x", // null or "" (empty string)
    v: "0x25",
    r: "0x67da959a6d114d42016b5fb43ff8ae018efe6e4c784d40dfb2f2aad8fb2d4f6c",
    s: "0x0b019b1e457b592e5bfd553e3b73742de625c7b65145494a57dbca17e5e9d842",
}

const tx = new EthereumTx (
    txParams, {chain: "mainnet"}
)

const key = tx.getSenderPublicKey()
// keccak256(public key)
// d854623eb394bee7c483b540055b936d7603f0b12b980631884b0628bb10a86e
// 0x055b936d7603f0b12b980631884b0628bb10a86e
const address = tx.getSenderAddress()
const isValid = tx.verifySignature()

console.log ("Public Key: ", key.toString("hex"))
console.log ("Address: ", address.toString("hex"))
console.log ("Is Valid ", isValid)

// Public Key:  75f8f18b4b406cfbe953b5efc2e0902cf8ac2787f91e8e9853aa1d5eeb5b8f7244247e7901b5c2389230eb185320aa44d3f87c884501b108531a50034b05541e
// Address:  055b936d7603f0b12b980631884b0628bb10a86e
