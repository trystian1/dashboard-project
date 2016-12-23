'use strict';

describe('Service: metricsService', function () {

  // load the service's module
  beforeEach(module('dashboardProjectApp'));

  // instantiate service
  var metricsService;
  beforeEach(inject(function (_metricsService_) {
    metricsService = _metricsService_;
  }));

  it('should do something', function () {
    expect(!!metricsService).toBe(true);
  });

});
