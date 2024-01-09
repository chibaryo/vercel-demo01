import { writable } from 'svelte/store'

export const majaArray = writable([])
export const midArray = writable([])
export const minArray = writable([])

export const majaSelectedStore = writable()
export const midSelectedStore = writable()
export const minSelectedStore = writable()
export const gptchatStrStore = writable('')

export const vectStore = writable([])
export const isVisibleGptAnswerBox = writable(false)
export const loading = writable(false)
export const message = writable('')
export const prevTalks = writable([])