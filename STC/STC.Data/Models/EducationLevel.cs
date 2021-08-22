using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace STC.Data.Models
{
    [Table("education_level")]
    public partial class EducationLevel
    {
        public EducationLevel()
        {
            CandidateHasEducations = new HashSet<CandidateHasEducation>();
            EducationDegrees = new HashSet<EducationDegree>();
            EducationMajors = new HashSet<EducationMajor>();
        }

        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Required]
        [Column("name")]
        [StringLength(250)]
        public string Name { get; set; }
        [Column("create_time", TypeName = "timestamp")]
        public DateTime CreateTime { get; set; }
        [Column("update_time", TypeName = "timestamp")]
        public DateTime? UpdateTime { get; set; }
        [Column("is_deleted")]
        public bool IsDeleted { get; set; }

        [InverseProperty(nameof(CandidateHasEducation.EducationLevel))]
        public virtual ICollection<CandidateHasEducation> CandidateHasEducations { get; set; }
        [InverseProperty(nameof(EducationDegree.EducationLevel))]
        public virtual ICollection<EducationDegree> EducationDegrees { get; set; }
        [InverseProperty(nameof(EducationMajor.EducationLevel))]
        public virtual ICollection<EducationMajor> EducationMajors { get; set; }
    }
}
