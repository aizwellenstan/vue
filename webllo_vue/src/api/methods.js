import Api from './index'

export default {
	registerPosting(item) {
		return Api().post('/test', item)
	}
}
