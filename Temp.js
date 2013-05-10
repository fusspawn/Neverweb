function() {
    $(document).ready(function() {
        var a, b, d, e, g, m, n = client.dataModel,
            o = "craft_" + n.model.queryParams.categoryName.toLowerCase();
        if (!client.dataModel.model.craftinglist || !client.dataModel.model.craftinglist[o]) return;
        a = client.dataModel.model.craftinglist[o].entries;
        if (!a) return;
        b = new h, d = [];
        for (e = 0; e < a.length; e++) {
            if (typeof a[e] == "undefined") continue;
            g = a[e].header.toLowerCase(), m = [g === "rare" ? 2 : g === "common" ? 3 : 9, a[e].isheader ? 1 : 0, 0, a[e].isheader ? 0 : a[e].failslevelrequirementsfilter ? 1 : 0, a[e].isheader ? 0 : a[e].failsresourcesrequirements ? 1 : 0, "", '<div data-set-class="task-list-entry"></div>'],
            function(a, c, d) {
                c.isheader || b.add(function(b) {
                    client.dataModel.resolvePath(".hdef.requiredrank", c, function(c, d) {
                        a[2] = d, b()
                    })
                }), b.add(function(b) {
                    client.dataModel.resolvePath(".hdef.displayname.str", c, function(c, d) {
                        a[5] = d, b()
                    })
                }), b.add(function(b) {
                    n.render(l["content-professions-tasklist-task"], "content-professions-tasklist-task", ".craftinglist." + o + ".entries[" + d + "]", function(c, d) {
                        a[6] = d.join(""), b()
                    })
                })
            }(m, a[e], e), d.push(m)
        }
        b.waitForAll(function() {
            c = undefined, $("table#tasklist").dataTable({
                bDestroy: !0,
                bSortClasses: !1,
                bLengthChange: !1,
                iDisplayLength: 8,
                oLanguage: {
                    sEmptyTable: "There are no tasks"
                },
                aaData: d,
                aoColumns: [{
                    bVisible: !1,
                    bSearchable: !1,
                    sType: "numeric"
                }, {
                    bVisible: !1,
                    bSearchable: !1,
                    sType: "numeric"
                }, {
                    bVisible: !1,
                    bSearchable: !1,
                    sType: "numeric"
                }, {
                    bVisible: !1,
                    bSearchable: !1,
                    sType: "numeric"
                }, {
                    bVisible: !1,
                    bSearchable: !1,
                    sType: "numeric"
                }, {
                    bVisible: !1,
                    bSearchable: !0,
                    sType: "string"
                }, {
                    bVisible: !0,
                    bSearchable: !1,
                    sType: "html"
                }],
                aaSorting: [
                    [0, "asc"],
                    [1, "desc"],
                    [2, i]
                ],
                oSearch: {
                    sSearch: k
                },
                aoSearchCols: [null, null, null, {
                    sSearch: j.hide_abovelevel ? "0" : "",
                    bRegex: !1,
                    bSmart: !1
                }, {
                    sSearch: j.hide_unmetreqs ? "0" : "",
                    bRegex: !1,
                    bSmart: !1
                },
                null, null],
                bStateSave: !0,
                fnStateSave: function(a, b) {
                    f.startCountdowns(), k = b.oSearch.sSearch
                },
                fnInitComplete: function() {
                    var a;
                    c = this;
                    for (a in j) j[a] ? $("input[name='" + a + "']").attr("checked", !0).closest("label").addClass("checked") : $("input[name='" + a + "']").attr("checked", !1).closest("label").removeClass("checked");
                    $("input[type='radio'][value='" + i + "']").attr("checked", !0).closest("label").addClass("checked")
                }
            }), client.onAfterSetStencil()
        })
    }), this.handleCheckBox = function(a) {
        j[a.attr("name")] = a.is(":checked"), f.professionTaskFilterChange(a)
    }, this.handleRadioButton = function(a) {
        i = a.val(), f.professionTaskSortChange(a)
    }
}