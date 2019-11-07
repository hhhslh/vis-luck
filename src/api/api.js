import {get, post } from '@/api/http'

//国际学校库 学校列表
export const getred = p => get('/activity/TugOfWar_PeopleList.do', p)
export const getblue = p => get('/activity/TugOfWar_PeopleList.do', p)