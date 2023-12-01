import { writable } from 'svelte/store'

export const majaArray = writable([])
export const midArray = writable([])
export const minArray = writable([])

export const majaSelectedStore = writable()
export const midSelectedStore = writable()
export const minSelectedStore = writable()
export const gptchatStrStore = writable('')
