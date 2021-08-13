using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace STC.Data.Models
{
    [Table("course")]
    public partial class Course
    {
        public Course()
        {
            CandidateHasCourses = new HashSet<CandidateHasCourse>();
            UserHasCourses = new HashSet<UserHasCourse>();
        }

        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Required]
        [Column("name")]
        [StringLength(250)]
        public string Name { get; set; }
        [Column("description")]
        [StringLength(500)]
        public string Description { get; set; }
        [Column("create_time", TypeName = "timestamp")]
        public DateTime CreateTime { get; set; }
        [Column("update_time", TypeName = "timestamp")]
        public DateTime? UpdateTime { get; set; }
        [Column("is_deleted")]
        public bool IsDeleted { get; set; }

        [InverseProperty(nameof(CandidateHasCourse.Course))]
        public virtual ICollection<CandidateHasCourse> CandidateHasCourses { get; set; }
        [InverseProperty(nameof(UserHasCourse.Course))]
        public virtual ICollection<UserHasCourse> UserHasCourses { get; set; }
    }
}
