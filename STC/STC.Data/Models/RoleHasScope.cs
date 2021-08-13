using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace STC.Data.Models
{
    [Table("role_has_scope")]
    [Index(nameof(RoleId), Name = "fk_role_has_scope_role1_idx")]
    [Index(nameof(ScopeId), Name = "fk_role_has_scope_scope1_idx")]
    public partial class RoleHasScope
    {
        [Key]
        [Column("role_id")]
        public int RoleId { get; set; }
        [Key]
        [Column("scope_id")]
        public int ScopeId { get; set; }

        [ForeignKey(nameof(RoleId))]
        [InverseProperty("RoleHasScopes")]
        public virtual Role Role { get; set; }
        [ForeignKey(nameof(ScopeId))]
        [InverseProperty("RoleHasScopes")]
        public virtual Scope Scope { get; set; }
    }
}
