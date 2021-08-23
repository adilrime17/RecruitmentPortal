using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace STC.Data.Models
{
    [Table("course_has_test")]
    [Index(nameof(CourseId), Name = "fk_course_has_test_course1_idx")]
    [Index(nameof(TestId), Name = "fk_course_has_test_test1_idx")]
    public partial class CourseHasTest
    {
        [Key]
        [Column("course_id")]
        public int CourseId { get; set; }
        [Key]
        [Column("test_id")]
        public int TestId { get; set; }
        [Column("total_marks")]
        public float TotalMarks { get; set; }
        [Column("required_marks")]
        public float RequiredMarks { get; set; }
        [Column("create_time", TypeName = "timestamp")]
        public DateTime CreateTime { get; set; }
        [Column("update_time", TypeName = "timestamp")]
        public DateTime? UpdateTime { get; set; }

        [ForeignKey(nameof(CourseId))]
        [InverseProperty("CourseHasTests")]
        public virtual Course Course { get; set; }
        [ForeignKey(nameof(TestId))]
        [InverseProperty("CourseHasTests")]
        public virtual Test Test { get; set; }
    }
}
