    /**
     * @ngdoc resource
     * @name invoiceResource
     * @description Loads in data and allows modification for invoices
     **/
    angular.module('merchello.resources')
        .factory('invoiceResource', [
            '$q', '$http', 'umbRequestHelper',
            function($q, $http, umbRequestHelper) {

                return {

                    /**
                     * @ngdoc method
                     * @name getByKey
                     * @description
                     **/
                    getByKey: function (id) {
                        var url = Umbraco.Sys.ServerVariables['merchelloUrls']['merchelloInvoiceApiBaseUrl'] + 'GetInvoice';
                        return umbRequestHelper.resourcePromise(
                            $http({
                                url: url,
                                method: "GET",
                                params: { id: id }
                            }),
                            'Failed to retreive data for invoice id: ' + id);
                    },

                    /**
                     * @ngdoc method
                     * @name getByCustomerKey
                     * @description
                     **/
                    getByCustomerKey: function(customerKey) {
                        var query = queryDisplayBuilder.createDefault();
                        query.applyInvoiceQueryDefaults();
                        query.addCustomerKeyParam(customerKey);

                        return umbRequestHelper.resourcePromise(
                            $http.post(umbRequestHelper.getApiUrl('merchelloInvoiceApiBaseUrl', 'SearchByCustomer'), query),
                            'Failed to retreive invoices');
                    },

                    /**
                     * @ngdoc method
                     * @name searchInvoices
                     * @description
                     **/
                    searchInvoices: function (query) {
                        if (query === undefined) {
                            query = queryDisplayBuilder.createDefault();
                            query.applyInvoiceQueryDefaults();
                        }
                        var url = Umbraco.Sys.ServerVariables['merchelloUrls']['merchelloInvoiceApiBaseUrl'] + 'SearchInvoices';
                        return umbRequestHelper.resourcePromise(
                            $http.post(url, query),
                            'Failed to retreive invoices');
                    },

                    nextsearchInvoices: function(query) {
                        var deferred = $q.defer();
                        var promises = [];
                        promises.push(this.doSearchInvoices(query));

                    },

                    /**
                     * @ngdoc method
                     * @name searchInvoicesByDateRange
                     * @description
                     **/
                    searchInvoicesByDateRange: function (query) {
                        if (query === undefined) {
                            query = queryDisplayBuilder.createDefault();
                            query.applyInvoiceQueryDefaults();
                        }
                        var url = Umbraco.Sys.ServerVariables['merchelloUrls']['merchelloInvoiceApiBaseUrl'] + 'SearchByDateRange';
                        return umbRequestHelper.resourcePromise(
                            $http.post(url, query),
                            'Failed to retreive invoices');
                    },

                    /**
                     * @ngdoc method
                     * @name saveInvoice
                     * @description
                     **/
                    saveInvoice: function (invoice) {
                        var url = Umbraco.Sys.ServerVariables['merchelloUrls']['merchelloInvoiceApiBaseUrl'] + 'PutInvoice';
                        return umbRequestHelper.resourcePromise(
                            $http.post(url,
                                invoice
                            ),
                            'Failed to save invoice');
                    },

                    saveInvoiceShippingAddress: function (data) {
                        return umbRequestHelper.resourcePromise(
                            $http.post(umbRequestHelper.getApiUrl('merchelloInvoiceApiBaseUrl', 'PutInvoiceShippingAddress'),
                                data
                            ),
                            'Failed to save invoice');
                    },

                    /**
                     * @ngdoc method
                     * @name deleteInvoice
                     * @description
                     **/
                    deleteInvoice: function (invoiceKey) {
                        var url = Umbraco.Sys.ServerVariables['merchelloUrls']['merchelloInvoiceApiBaseUrl'] + 'DeleteInvoice';
                        return umbRequestHelper.resourcePromise(
                            $http({
                                url: url,
                                method: "GET",
                                params: { id: invoiceKey }
                            }),
                            'Failed to delete invoice');
                    }

                };
            }]);
