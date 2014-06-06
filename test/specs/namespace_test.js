'use strict';

var should = require('should');

var namespace = require('../coverage/src/main');

describe('#nameSpace', function () {
	describe('#constructor', function () {
		it('should be a function', function () {
			namespace.should.be.an.function;
		});
	});

	// describe('#set/get namespace', function () {
	describe('single value', function () {
		it('should set/get a single value', function () {
			var ns = namespace();
			ns('a').should.be.an.object;
			ns('a', 1);
			ns('a').should.be.eql(1);
		});
		it('should set/get multiple values', function () {
			var ns = namespace();
			ns('a').should.be.an.object;
			ns('a', 1);
			ns('a').should.be.eql(1);
			ns('a', 2);
			ns('a').should.be.eql(2);
		});
		it('should set not undefined value when force is set not set', function () {
			var ns = namespace();
			ns('a').should.be.an.object;
			ns('a', 1);
			ns('a').should.be.eql(1);
			ns('a', undefined);
			ns('a').should.be.eql(1);
		});
		it('should set undefined value when force is set to true', function () {
			var ns = namespace();
			ns('a').should.be.an.object;
			ns('a', 1);
			ns('a').should.be.eql(1);
			ns('a', undefined, true);
			ns('a').should.be.an.object;
		});
		describe('#delete', function () {
			it('should delete value', function () {
				var ns = namespace();
				ns('a').should.be.an.object;
				ns('a', 1);
				ns('a').should.be.eql(1);
				ns.delete('a');
				ns('a').should.be.an.object;
			});
		});
	});

	describe('nested value', function () {
		it('should set/get a single value', function () {
			var ns = namespace();
			ns('a.b').should.be.an.object;
			ns('a.b', 1);
			ns('a').should.be.an.object;
			ns('a.b').should.be.eql(1);
		});
		it('should set/get multiple values', function () {
			var ns = namespace();
			ns('a.b').should.be.an.object;
			ns('a.b', 1);
			ns('a').should.be.an.object;
			ns('a.b').should.be.eql(1);
			ns('a.b', 2);
			ns('a.b').should.be.eql(2);
		});
		it('should set not undefined value when force is set not set', function () {
			var ns = namespace();
			ns('a.b').should.be.an.object;
			ns('a.b', 1);
			ns('a').should.be.an.object;
			ns('a.b').should.be.eql(1);
			ns('a.b', undefined);
			ns('a.b').should.be.eql(1);
		});
		it('should set undefined value when force is set to true', function () {
			var ns = namespace();
			ns('a.b').should.be.an.object;
			ns('a.b', 1);
			ns('a').should.be.an.object;
			ns('a.b').should.be.eql(1);
			ns('a.b', undefined, true);
			ns('a.b').should.be.an.object;
		});
		describe('#delete', function () {
			it('should delete sub-namespaces', function () {
				var ns = namespace();
				ns('a.b').should.be.an.object;
				ns('a.b', 1);
				ns('a.c', 2);
				ns('a').should.be.an.object;
				ns('a.b').should.be.eql(1);
				ns.delete('a');
				ns('a').should.be.an.object;
				ns('a').should.be.empty;
				ns('a.c').should.be.an.object;
			});
			it('should delete leaf-namespaces', function () {
				var ns = namespace();
				ns('a.b').should.be.an.object;
				ns('a.b', 1);
				ns('a.c', 2);
				ns('a').should.be.an.object;
				ns('a.b').should.be.eql(1);
				ns.delete('a.b');
				ns('a').should.be.an.object;
				ns('a.c').should.be.eql(2);
			});
		});
	});
});