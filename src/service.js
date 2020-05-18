import Vue from 'vue'
import VueResource from 'vue-resource'
import config from './config'

Vue.use(VueResource);

let handlPostData = function (data) {
	let useType = JSON.parse(sessionStorage.getItem('wxuseType')) || config.getQueryString('useType') || '';
	if (data && !data.useType && useType) {
		data.useType = useType;
	}
	return data;
}
export default {

	/*获取省市区*/
	getHnAreaByGrade: function (data, callback) {
		Vue.http.post(config.api + config.getHnAreaByGrade, handlPostData(data)).then(callback)
	},
	getHnAreaById: function (data, callback) {
		Vue.http.post(config.api + config.getHnAreaById, handlPostData(data)).then(callback)
	},


}
