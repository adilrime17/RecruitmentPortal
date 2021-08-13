using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace STC.Data.Models
{
    [Table("status")]
    public partial class Status
    {
        public Status()
        {
            CandidateHasCourses = new HashSet<CandidateHasCourse>();
        }

        [Key]
        [Column("id")]
        [StringLength(250)]
        public string Id { get; set; }
        [Required]
        [Column("name")]
        [StringLength(250)]
        public string Name { get; set; }
        [Column("category")]
        [StringLength(250)]
        public string Category { get; set; }
        [Column("is_reason_required")]
        public bool IsReasonRequired { get; set; }
        [Column("create_time", TypeName = "timestamp")]
        public DateTime CreateTime { get; set; }
        [Column("update_time", TypeName = "timestamp")]
        public DateTime? UpdateTime { get; set; }

        [InverseProperty(nameof(CandidateHasCourse.Status))]
        public virtual ICollection<CandidateHasCourse> CandidateHasCourses { get; set; }
    }
}
